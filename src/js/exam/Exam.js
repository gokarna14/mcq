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
import NormalExam from "./NormalExam";


const Exam =(props)=>{

    const [showExamOption, setShowExamOption] = useState(true)
    const [questions, setQuestions] = useState([])
    const [responses, setResponses] = useState({})
    const [result, setResult] = useState([])
    const [finalScore, setFinalScore] = useState(0)
    const [renderResult_tf, setRenderResult_tf] = useState(false)
    const [showQuestion, setShowQuestion] = useState(false)

    const resetExamProps=()=>{
        setShowExamOption(true)
        setQuestions([])
        setResponses({})
        setResult([])
        setFinalScore(0)
        setRenderResult_tf(false)
        setShowQuestion(false)
    }
    
    const examProps={
        questions: questions,
        setResponses: setResponses,
        setShowExamOption: setShowExamOption,
        // loadQuestions: loadQuestions,
        // renderQuestion: renderQuestion,
        // generateResult: generateResult,
        setRenderResult_tf: setRenderResult_tf,
        renderResult_tf: renderResult_tf,
        finalScore: finalScore,
        // resultRender: resultRender,
        showQuestion: showQuestion,
        setShowQuestion: setShowQuestion,
        resetExamProps: resetExamProps,
        universalProps: props.universalProps,
        numberOfQuestions:{
            quickExam: 8,
        }
        
    }



    const examTopics=[
        {
            label: 'Take Quick Exam',
            path: '/quickExam/*',
            element: <QuickExam
                examProps={examProps}
            ></QuickExam>
        }, {
            label: 'Take normal exam',
            path: '/normalExam/*',
            element: <NormalExam
                examProps={examProps}
        ></NormalExam>
        },{
            label: 'Compete with others',
            path: '/competeExam/*',
            element: <CompeteExam
                examProps={examProps}
        ></CompeteExam>
        }, {
            label: 'My progress',
            path: '/myProgress/*',
            element: <MyProgress
                examProps={examProps}
                universalProps={examProps.universalProps}
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