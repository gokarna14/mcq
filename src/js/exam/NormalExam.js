import React, { useState } from "react";
// import axios from "axios";
import {
    Routes,
    Route,
    Link
  } from 'react-router-dom';

import McqSection from "./McqSection";
import LoginSignUpToContinue from "../loginSignUp/LoginSignUpToContinue";


export default function NormalExam(props){

    const mcqSection = (
        <Routes>
            <Route
                exact
                path={"/QuickExamMCQ"}
                element={<McqSection
                    type={'normal'}
                    universalProps={props.examProps.universalProps}
                    numberOfQuestion={
                        props.examProps.numberOfQuestions.normalExam
                    }
                    seconds={1000}
                ></McqSection>}
            ></Route>
        </Routes>
)


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
                

            <h1>Section of quick Exam.</h1>
            <br />
            
            <Link
                to={'./QuickExamMCQ'} className='normalizeText'>
                <span className='btn btn-outline-danger'>
                    Take Normal Exam
                </span>
            </Link>

            {mcqSection}

        </>   
            }
            {props.examProps.resultRender}
        </>
    )
}