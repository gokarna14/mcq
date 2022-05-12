import React from "react";
import Home from "./home/Home";
import NavBar from "./navbar/NavBar";


const AlwaysRender =(props)=>{



    return(
        <>
            <NavBar
                appName={props.appName}
                universalProps={props.universalProps}
            ></NavBar>
        </>
    )
}

export default AlwaysRender;