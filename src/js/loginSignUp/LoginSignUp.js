import React, { useState } from "react";

import LoginSignUpButton from "./LoginSignUpButton";

export default function LoginSignUp(props){

    return(
        <LoginSignUpButton
            universalProps={props.universalProps}
        ></LoginSignUpButton>
    )
}