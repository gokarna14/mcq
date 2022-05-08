import React from "react";




const ThirdPart=()=>{

    const buttonClicked = ()=>{
        console.log("HERE")
    }


    return(
        <>
            <h1>This is the part I am talking About</h1>
            <button className="btn btn-primary"
                onClick={buttonClicked}
            >
                Click Me
            </button>
        </>
    )

}

export default ThirdPart;