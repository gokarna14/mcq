import React from "react";
import axios from "axios";

import LoginSignUpToContinue from "../loginSignUp/LoginSignUpToContinue";

const MyProgress = (props)=>{

    return(
        <>
            {
                !props.examProps.universalProps.userLoggedIn && 
                <>
                    <LoginSignUpToContinue
                        universalProps={props.examProps.universalProps}
                    ></LoginSignUpToContinue>
                </>
            }{
                props.examProps.universalProps.userLoggedIn && 
                <>
                    <h3>Welcome , {props.examProps.universalProps.loggedInUser.fname} 🔥</h3>
                </>
            }
        </>
    )

}

export default MyProgress;