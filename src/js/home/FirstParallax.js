import React from "react";
import { Parallax } from "react-parallax";

import { home } from "../../resources/db/media/img";
import { spacing } from "../essentials/tools";
import TextMovement from "../animations/TextMovement";

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
                            <TextMovement
                                content={<>
                                    <h1>WELCOME</h1>
                                    <h1>TO</h1>
                                    <h1>{props.appName} !</h1>  
                                </>}
                                animate={{
                                    x: [-200, 600, 0],
                                    rotate: [0, 1, 0],
                                }}
                                ></TextMovement>  
                        </div>
                        {spacing}
                {spacing}
            </Parallax>
    )

}

export default FirstParallax;