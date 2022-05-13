import React from "react";
import Home from "./home/Home";
import NavBar from "./navbar/NavBar";
import LoginSignUpButton from "./loginSignUp/LoginSignUpButton";

const AlwaysRender =(props)=>{



    return(
        <>
            <NavBar
                appName={props.appName}
                universalProps={props.universalProps}
            ></NavBar>
            <LoginSignUpButton
                universalProps={props.universalProps}
            ></LoginSignUpButton>
        </>
    )
}

export default AlwaysRender;