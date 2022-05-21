import React from "react";
import Emphasize from "../animations/Emphasize";
import LoginSignUpButton from "./LoginSignUpButton";

export default function LoginSignUpToContinue(props){
    
    return(
        <>
            <div className="niceCenterExtreme">
                <div className="shadow p-3 mb-5 bg-white rounded">
                    <hr />
                        <Emphasize
                            content={
                                <>
                                    <h4>
                                        Please Login to continue to this section.
                                    </h4>
                                </>
                            }
                        ></Emphasize>

                        <LoginSignUpButton
                            universalProps={props.universalProps}
                        ></LoginSignUpButton>
                </div>
            </div>
        </>
    )
}