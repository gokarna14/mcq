import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import AlwaysRender from './js/AlwaysRender';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import axios from 'axios';


import Home from './js/home/Home';
import About from './js/about/About';
import Exam from './js/exam/Exam';
import LoginSignUp from './js/loginSignUp/LoginSignUp';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


function App() {
  useEffect(() => {
    axios.post("/api/checkActiveSession")
    .then(
      res=>{
        return res.data;
      }
    )
    .then(
      user_id => {
        // eslint-disable-next-line eqeqeq
        if (user_id != '-69'){
          // console.log(user_id);
          axios.post('/api/UserLogInWithID', {user_id: user_id}).then(
            res=>{
              return res.data[0];
            }
          )
          .then(
            async (userInformation) =>{
              setUserInf(userInformation);
              setLoggedInUser(userInformation);
              setUserLoggedIn(true);
            }
            )
            .catch(err=>{
              console.log(err);
            })
        }
      }
    )
  }, []);
  useEffect(()=>{});

  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userInf, setUserInf] = useState({})
  const [loggedInUser, setLoggedInUser] = useState({})

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
    handleInputChange: handleInputChange,
    loggedInUser: loggedInUser,
    setLoggedInUser: setLoggedInUser
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

      {/* <button
        onClick={()=>{
          console.log(userInf);
        }}
      >Log Info</button> */}
    </div>
  );
}

export default App;
