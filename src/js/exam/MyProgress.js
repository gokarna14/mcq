import React from "react";
import axios from "axios";

import LoginSignUpToContinue from "../loginSignUp/LoginSignUpToContinue";
import { useEffect } from "react";
import LoadingModal from "../templates/LoadingModal";
import { useState } from "react";
import Result from "./Result";


const MyProgress = (props)=>{

    const [showLoading, setShowLoading] = useState(true)
    const [userExamRecords, setUserExamRecords] = useState([]);
    const [fullResponse, setFullResponse] = useState([])
    const [score, setScore] = useState(0)
    const [numOfQuestions, setNumOfQuestions] = useState(0)
    const [showFullProgress, setShowFullProgress] = useState(false)
    const [nowSorted, setNowSorted] = useState('ts')

    const sortSign =   <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-up" viewBox="0 0 16 16">
            <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
        </svg>
    </>
    

    const examType = {
        'quick' : 'Quick Exam',
        'normal' : 'Normal Exam'
    },
    fullMarks = {
        'quick': 8,
        'normal': 50
    }

    const addFullMarkAndCorrect=(arrayOfRecord)=>{
        var temp = []
        for (var examRecord of arrayOfRecord){
            examRecord['fullMark'] = fullMarks[examRecord.response_type]
            examRecord['correct%'] =  (examRecord.score/fullMarks[examRecord.response_type])*100
            temp.push(examRecord)
        }
        console.log(temp);
        setUserExamRecords(temp);
    }

    const refresh=()=>{
        if (props.examProps.universalProps.userLoggedIn){
            console.log("On PROGRESS");
            axios.post('/api/userExamRecords', {
                userInf: props.examProps.universalProps.userInf
            }).then(
                res=>{
                    addFullMarkAndCorrect(res.data);
                }
            )
        }
    }

    const viewFullProgress=(response_id, numOfQns)=>{
        // console.log(props);
        axios.post('/api/getResponseAndScore', {
            userInf: props.universalProps.userInfuserInf,
            all_response_id: response_id
        }).then(
            response=>{
                setFullResponse(response.data.response);
                return response.data.score;
            }
        )
        .then(
            score_=>{
                setScore(score_)
            }
        )

        setNumOfQuestions(numOfQns);
        setShowFullProgress(true);
    }


    useEffect(()=>{
        refresh();
        setShowLoading(false);
    }, [])


    const loopThroughExamRecords = userExamRecords.map(
        examRecord=>{
            return(
                <>
                <tbody>
                    <td>{examType[examRecord.response_type]}</td>
                    <td>{examRecord.ts.split('T')[0]}</td>
                    <td>{examRecord.ts.split('T')[1].split('.')[0]}</td>
                    <td>{examRecord.score}</td>
                    <td>{fullMarks[examRecord.response_type]}</td>
                    <td>{(examRecord.score/fullMarks[examRecord.response_type])*100} %</td>
                    <td>
                        <button
                            onClick={()=>{
                                viewFullProgress(examRecord.all_response_id, fullMarks[examRecord.response_type])
                            }}
                        >
                            See Full data
                        </button>
                    </td>
                </tbody>
                </>
            )
        }
    )


    const sortBy=async(col)=>{
        if (userExamRecords.length > 0){
            // console.log(`Sort by: ${col}`);
            // console.log(userExamRecords);
            var temp = userExamRecords.sort(
                (first, second)=> (
                    nowSorted === col ? 
                    (second[col]>first[col] ? 1 :((first[col]>second[col] ? -1 : 0)))
                    : 
                    (first[col]>second[col]? 1 :((second[col]>first[col] ? -1 : 0)))
                ))
            setUserExamRecords(temp);
            setScore(1000);
            setNowSorted(nowSorted === col ? '' : col)
        }
    }

    const allExamRecords=( userExamRecords.length > 0 ?
    <table className="table">
        <thead>
            <tr>
                <th>Exam Type <span
                    onClick={()=>{sortBy('response_type')}}
                >{sortSign}</span>
                </th>
                <th>Date <span
                    onClick={()=>{sortBy('ts')}}>{sortSign}</span>
                </th>
                <th>Time</th>
                <th>Score <span
                    onClick={()=>{sortBy('score')}}>{sortSign}</span>
                </th>
                <th>Full Mark <span
                    onClick={()=>{sortBy('fullMark')}}>{sortSign}</span>
                </th>
                <th>Correct <span
                    onClick={()=>{sortBy('correct%')}}>{sortSign}</span>
                </th>
                <th>See Full Record</th>
            </tr>
        </thead>
        {loopThroughExamRecords}
    </table> : 
    <>
        {props.examProps.universalProps.userLoggedIn && <>
            <h3>No Record found ! Seems like you are new around here !</h3>
            Or not?
            <br />
                <button
                className="btn btn-warning"
                onClick={refresh}
                >Reload
                </button>
        </>}
    </>
    
        
    )

    // console.log(props);

    return(
        <>
            <LoadingModal
                text={'Loading ...'}
                open={showLoading}
            ></LoadingModal>
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
                <hr />
                    <h3>Welcome , {props.examProps.universalProps.loggedInUser.fname} 🔥</h3>
                <hr />
                </>
            }
            
            <div className="niceCenter">
                {allExamRecords}
            </div>




           {showFullProgress && <Result
                    fullResponse = {fullResponse}
                    universalProps = {props.universalProps}
                    numberOfQuestion = {numOfQuestions}
                    setShowResult = {setShowFullProgress}
                    showResult={showFullProgress}
                    score={score}
                ></Result>}

            
        </>
    )

}

export default MyProgress;