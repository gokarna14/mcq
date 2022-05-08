import React from "react";

import FirstParallax from "./FirstParallax";
import SecondPart from "./SecondPart";
import ThirdPart from "./ThirdPart";


const Home =(props)=>{

    return(
        <>
            <FirstParallax
                appName={props.appName}
            ></FirstParallax>
            <SecondPart></SecondPart>
            <ThirdPart></ThirdPart>
        </>
    )
}

export default Home;