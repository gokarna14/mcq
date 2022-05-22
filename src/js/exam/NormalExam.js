import React, { useState } from "react";
import LoginSignUpToContinue from "../loginSignUp/LoginSignUpToContinue";


export default function NormalExam(props){

    const [numberOfQuestions, setNumberOfQuestions] = useState(50)

    const startNormalExam=()=>{
        props.examProps.loadQuestions(numberOfQuestions)


        props.examProps.setShowQuestion(true)
        props.examProps.setRenderResult_tf(false)
        props.examProps.setShowExamOption(false)

        console.log(props.examProps.questions);
        console.log(props.examProps.showQuestion);

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
                <div className="loggedIn">
                    <hr />
                    <h3>Welcome , {props.examProps.universalProps.loggedInUser.fname} 🔥</h3>
                    <hr />
                    {   !props.examProps.showQuestion ?

                        <button className="btn btn-primary"
                            onClick={startNormalExam}
                        >
                            Take the normal exam
                        </button>
                        :
                        <>
                            {props.examProps.renderQuestion}
                            <>
                                <hr />
                                <button className="btn btn-warning"
                                    onClick={()=>
                                        {
                                            props.examProps.generateResult()
                                            props.examProps.setShowQuestion(false)
                                            props.examProps.setRenderResult_tf(true)
                                            props.examProps.setShowExamOption(true)
                                            console.log(props.examProps.responses)

                                        }
                                    }
                                >
                                    Submit and See Result
                                </button>
                            </>
                        </>
                    }
                </div>
                
            }
            {props.examProps.resultRender}
        </>
    )
}