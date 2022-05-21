import React, { useState } from "react";
import LoginSignUpToContinue from "../loginSignUp/LoginSignUpToContinue";


export default function NormalExam(props){

    const [numberOfQuestions, setNumberOfQuestions] = useState(10)

    const startNormalExam=()=>{
        props.examProps.setShowQuestion(true)
        props.examProps.loadQuestions(numberOfQuestions, true)
        props.examProps.setRenderResult_tf(false)
    }


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
                    <hr />
                    {!props.examProps.showQuestion && <button className="btn btn-primary"
                    onClick={startNormalExam}
                    >
                        Start a quick MCQ
                    </button>}
                    {props.examProps.renderQuestion}
                    <hr />
                    <button className="btn btn-warning"
                        onClick={()=>
                            {
                                props.examProps.generateResult()
                                props.examProps.setShowQuestion(false)
                                props.examProps.setRenderResult_tf(true)
                                props.examProps.setShowExamOption(true)

                            }
                        }
                    >
                        Submit and See Result
                    </button>
                    {props.examProps.resultRender}
                </>
                
            }
        </>
    )
}