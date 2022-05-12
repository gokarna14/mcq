import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from 'react-router-dom';


import { questionCols } from "../../resources/db/questions";
import { shuffle } from "../essentials/essentials";

import QuickExam from "./QuickExam"
import CompeteExam from './CompeteExam'
import MyProgress from './MyProgress'


const Exam =(props)=>{

    const [showExamOption, setShowExamOption] = useState(true)
    const [questions, setQuestions] = useState([])
    const [responses, setResponses] = useState({})
    const [result, setResult] = useState([])
    const [finalScore, setFinalScore] = useState(0)
    const [renderResult_tf, setRenderResult_tf] = useState(false)
    const [showQuestion, setShowQuestion] = useState(false)



    const loadQuestions=(N=1)=>{
        console.log("Requesting Questions ...")
        axios.post('../api/loadQuestions', {N:N}).then(res=>{
            console.log(res.data)
            setQuestions(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const generateResult =()=>{
        let rightAns = {}, qns = {}
        for(let i=0; i<questions.length;i++){
            qns[questions[i].question_id] = questions[i].question
            rightAns[questions[i].question_id] = questions[i].right_answer
        }
        // console.log(qns)
        // console.log(rightAns)
        // console.log(responses)

        let score = 0, tempResult = []

        for(let i in responses){
            var toPush = {
                question: qns[i],
                rightAns: rightAns[i],
                userResponse: responses[i]
            }
            if(responses[i] === rightAns[i]){
                score++
                toPush['Right/Wrong'] = "✅ 😍"
            }
            else{
                toPush['Right/Wrong'] = "❌ 🙁"
            }
            tempResult.push(toPush)
        }
        
        setFinalScore(score)
        setResult(tempResult)
        // setRenderResult_tf(true)
        
    }

    const resultRender = renderResult_tf && <div className="niceCenter">
    <br />
    <hr />
        <table className="table"
            style={{
                textAlign: 'left'
            }}
        >
            <thead>
                <tr>
                        <th>Question</th>
                        <th>Right Answer</th>
                        <th>Your Answer</th>
                        <th>Right/Wrong</th>
                </tr>
            </thead>
            <tbody>
                    {result.map(
                        (i)=>{
                            return(<tr>
                                <td>{i.question}</td>
                                <td>{i.rightAns}</td>
                                <td>{i.userResponse}</td>
                                <td>{i['Right/Wrong']}</td>
                            </tr>
                            )
                        }
                    )}
            </tbody>
        </table>
       <h2>Final Score : {finalScore}</h2> 
    </div>
        


    const renderQuestion = (questions === [] ? [] : questions).map(
        (questionSet)=>{
            return(
                <form
                style={{
                    textAlign: 'left'
                }}
                className='niceCenter'
                >
                    <hr />
                    <h5>
                        {questions.indexOf(questionSet) +1}. {questionSet.question}
                    </h5>
                    <br />
                    {
                        shuffle([questionSet.right_answer, 
                            questionSet.option1, 
                            questionSet.option2, 
                            questionSet.option3]).map(
                            (i)=>{
                                return(
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" 
                                            type="radio" 
                                            name={"inlineRadioOptions" + {i}}
                                            id="inlineCheckbox1" 
                                            value={i}
                                            onChange={(e)=>{
                                                let temp = responses
                                                temp[questionSet.question_id] = e.target.value
                                                setResponses(temp)
                                                console.log(temp)
                                            }}
                                            />
                                        <label className="form-check-label">
                                            {i}
                                        </label>
                                    </div>
                                )
                            }
                        )
                    }
                    <br />
                    <hr />
                    
                </form>
            )
        }
    )

    const examProps={
        questions: questions,
        setResponses: setResponses,
        setShowExamOption: setShowExamOption,
        loadQuestions: loadQuestions,
        renderQuestion: renderQuestion,
        generateResult: generateResult,
        setRenderResult_tf: setRenderResult_tf,
        renderResult_tf: renderResult_tf,
        finalScore: finalScore,
        resultRender: resultRender,
        showQuestion: showQuestion,
        setShowQuestion: setShowQuestion
        
    }

    const examTopics=[
        {
            label: 'Take Quick Exam',
            path: '/quickExam',
            element: <QuickExam
                examProps={examProps}
            ></QuickExam>
        }, {
            label: 'Compete with others',
            path: '/competeExam',
            element: <CompeteExam
                examProps={examProps}
        ></CompeteExam>
        }, {
            label: 'My progress',
            path: '/myProgress',
            element: <MyProgress
                examProps={examProps}
        ></MyProgress>
        },
    ]

    const defineRoutes = examTopics.map(
        (i)=>{
            return(
                <Routes>
                    <Route
                        exact
                        path={i.path}
                        element= {i.element}
                    ></Route>
                </Routes>
            )
        }
    )

    const links=examTopics.map(
        (i)=>{
            return(
                <Link to={'.'+i.path} className='normalizeText'>
                    <span className='btn btn-outline-danger'>
                        {i.label}
                    </span>
                </Link> 
            )
            
        }
    )

    return(
        <>
            <h1>This is Exam Section Of {props.appName}</h1>
                {showExamOption && links}
                {defineRoutes}
        </>
    )
}

export default Exam;