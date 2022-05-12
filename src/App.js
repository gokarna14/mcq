import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';

import AlwaysRender from './js/AlwaysRender';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';


import Home from './js/home/Home';
import About from './js/about/About';
import Exam from './js/exam/Exam';
import LoginSignUp from './js/loginSignUp/LoginSignUp';


function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userInf, setUserInf] = useState({})

  const appName = 'MCQ Bank'

  const handleInputChange=(name, input)=>{
    let temp = userInf
    temp[name] = input
    setUserInf(temp)
    // console.log(temp);
}

  const universalProps = {
    userLoggedIn: userLoggedIn,
    setUserLoggedIn: setUserLoggedIn,
    userInf: userInf,
    setUserInf: setUserInf,
    handleInputChange: handleInputChange
  }

  const routing = [    // [path, component]
  ['/', <Home appName={appName} universalProps={universalProps}/>],
  ['/About/*', <About appName={appName} universalProps={universalProps}/>],
  ['/Exam/*', <Exam appName={appName} universalProps={universalProps}/>],
  ['/loginSignUp/*', <LoginSignUp appName={appName} universalProps={universalProps}/>],
  ]


  const routeInfo = routing.map(
      (i)=>{
      return <Route exact path={i[0]} element={i[1]} ></Route>
      }
  )

  return (
    <div className="App">
      <BrowserRouter>
              <AlwaysRender
                appName={appName}
                universalProps={universalProps}
              ></AlwaysRender>
          <Routes>
            {routeInfo}
          </Routes>
        </BrowserRouter>
        
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  );
}

export default App;
