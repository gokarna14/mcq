import React, { useState } from "react";
import axios from "axios";

const QuickExam = (props)=>{

    const [numberOfQuestions, setNumberOfQuestions] = useState(10)

    const [onViewQuestion, setOnViewQuestion] = useState("")
    const [questionIndex, setQuestionIndex] = useState(0)

    const startQuickExam=()=>{
        props.examProps.setShowQuestion(true)
        props.examProps.loadQuestions(numberOfQuestions)
        props.examProps.setRenderResult_tf(false)
    }

    const showResult=()=>{
        console.log("RESULT")
    }
// Array.from(Array(10).keys())



        
    return(
        <>
        <br />
        <br />
            {!props.examProps.showQuestion && <button className="btn btn-primary"
            onClick={startQuickExam}
            >
                Start a quick MCQ
            </button>}
        <hr />
        {
            props.examProps.showQuestion &&
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

                            }
                        }
                    >
                        Submit and See Result
                    </button>
                </>
            </>
        }
        {props.examProps.resultRender}
        {/* {props.examProps.renderResult && <h3>FINAL SCORE: {props.examProps.finalScore}/10</h3>} */}
        <hr />
        </>
    )

}

export default QuickExam;