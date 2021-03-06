import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';

import { navbar } from '../../resources/db/media/img';

import { NavTopics } from '../../resources/db/navbar/NavTopics';
import "./css/NavBar.css"



const NavBar = (props)=>{


    const navItems = (
    [...NavTopics,
    (props.universalProps.userLoggedIn ? {
        path: '/loginSignUp',
        label: '| Logged on as ' + props.universalProps.loggedInUser.fname,
        class: "navbar-item",
        DSlass: "nav-link"
    } : {
        path: '/loginSignUp',
        label: '| Login/Sign Up',
        class: "navbar-item",
        DSlass: "nav-link"
    })
    ]
    ).map(
        (i)=>{
            return <div>
                <Link to={i.path} className='normalizeText'>
                    <div className={i.DSlass}>
                        <span className='normalizeText damiText'>
                            {i.label}
                        </span>
                    </div>
                </Link>
            </div>
        }
    )

    return (
        <>
            <div className='fullNav'>
                <Parallax
                blur={1} 
                bgImage={navbar.background} 
                bgImageAlt="the cat" 
                strength={200}
                bgImageSizes="100%"
                >
                    <br />
                    <nav className="nav nav-tabs navbar-expand justify-content-center">
                        <>
                            {navItems}
                        </>
                        
                    </nav>
                </Parallax>
            </div>
        </>
    ) 
}

export default NavBar;