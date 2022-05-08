import React from "react";
import { Parallax } from "react-parallax";

import { home } from "../../resources/db/media/img";
import { spacing } from "../essentials/tools";


const FirstParallax=(props)=>{

    return(
        <Parallax
            blur={4} 
            bgImage={home.mcq} 
            bgImageAlt="the cat"
            strength={200}
            bgImageSizes="100%"
            >
                        {spacing}
                        {spacing}
                        <div className='niceCenter developers' 
                        style={{
                            textAlign:'left'
                        }}
                        >
                                <h1>WELCOME</h1>
                                <h1>TO</h1>
                                <h1>{props.appName} !</h1>                        
                        </div>
                        {spacing}
                {spacing}
            </Parallax>
    )

}

export default FirstParallax;