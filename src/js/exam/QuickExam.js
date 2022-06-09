import React, { useState } from "react";
import axios from "axios";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from 'react-router-dom';

import Emphasize from "../animations/Emphasize";
import McqSection from "./McqSection";

const QuickExam = (props)=>{

    const examRequest=()=>{

    }

    const mcqSection = (
                <Routes>
                    <Route
                        exact
                        path={"/QuickExamMCQ"}
                        element={<McqSection
                            type={'quick'}
                            universalProps={props.examProps.universalProps}
                            numberOfQuestion={
                                props.examProps.numberOfQuestions.quickExam
                            }
                        ></McqSection>}
                    ></Route>
                </Routes>
    )
        
    return(
        <>
                

            <h1>Section of quick Exam.</h1>
            <br />
            
            <Link
                to={'./QuickExamMCQ'} className='normalizeText'>
                <span className='btn btn-outline-danger'>
                    Take Quick Exam
                </span>
            </Link>

            {mcqSection}

        </>
    )

}

export default QuickExam;