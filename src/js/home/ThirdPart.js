import React from "react";
import axios from "axios";


const ThirdPart=()=>{

    const buttonClicked = ()=>{
        console.log("HERE")
        axios.post('/api/sumOfTwoNumbers', {a: 1, b: 2}).then(res=>{
            // console.log("DATA SENT TO THE NODE ??!!!??")
            console.log(res.data)
        }).catch(err=>{
            console.log("ERROR HERE <")
            console.log(err)
        })
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