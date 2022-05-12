import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from 'react-router-dom';


import Admin from "./admin/Admin";
import AboutUs from "./AboutUs";


const About =(props)=>{

    const aboutTopics=[
        {
            label: 'About us',
            path: '/',
            element: <AboutUs
                // examProps={examProps}
            ></AboutUs>
        },{
            label: 'Admin',
            path: '/admin',
            element: <Admin
                // examProps={examProps}
            ></Admin>
        }
    ]

    const defineRoutes = aboutTopics.map(
        (i)=>{
            return(
                <Routes>
                    <Route
                        exact
                        path={i.path}
                        element= {i.element}
                    ></Route>
                </Routes>
            )
        }
    )

    const links=aboutTopics.map(
        (i)=>{
            return(
                <Link to={'.'+i.path} className='normalizeText'>
                    <span className='btn btn-outline-danger'>
                        {i.label}
                    </span>
                </Link> 
            )
            
        }
    )

    return(
        <>
            <h1>About: This is {props.appName}</h1>
            {links}
            {defineRoutes}
        </>
    )
}

export default About;