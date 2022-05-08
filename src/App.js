import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';

import AlwaysRender from './js/AlwaysRender';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';


import NavBar from './js/navbar/NavBar';
import Home from './js/home/Home';
import About from './js/about/About';


function App() {

  const appName = 'MCQ Bank'

  const [routing, setRouting] = useState([    // [path, component]
  ['/', <Home appName={appName}/>],
  ['/About', <About appName={appName}/>],
  ])


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
