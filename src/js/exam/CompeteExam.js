import React from "react";
import LoginSignUpToContinue from "../loginSignUp/LoginSignUpToContinue";

const CompeteExam = (props)=>{

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

export default CompeteExam;