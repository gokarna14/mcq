import React from "react";
import axios from "axios";

import LoginSignUpToContinue from "../loginSignUp/LoginSignUpToContinue";
import { useEffect } from "react";
import LoadingModal from "../templates/LoadingModal";
import { useState } from "react";

const MyProgress = (props)=>{

    const [showLoading, setShowLoading] = useState(true)
    const [userExamRecords, setUserExamRecords] = useState([]);

    const examType = {
        'quick' : 'Quick Exam'
    },
    fullMarks = {
        'quick': 8
    }

    const refresh=()=>{
        if (props.examProps.universalProps.userLoggedIn){
            console.log("On PROGRESS");
            axios.post('/api/userExamRecords', {
                userInf: props.examProps.universalProps.userInf
            }).then(
                res=>{
                    // console.log(res.data);
                    setUserExamRecords(res.data);
                }
            )
        }
    }

    useEffect(()=>{
        if (props.examProps.universalProps.userLoggedIn){
            console.log("On PROGRESS");
            axios.post('/api/userExamRecords', {
                userInf: props.examProps.universalProps.userInf
            }).then(
                res=>{
                    // console.log(res.data);
                    setUserExamRecords(res.data);
                }
            )
        }
        else{
            // console.log("Not Logged In");
        }
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
                </tbody>
                </>
            )
        }
    )

    const allExamRecords=( userExamRecords.length > 0 ?
    <table className="table">
        <thead>
            <tr>
                <th>Exam Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Score</th>
                <th>Full Mark</th>
                <th>Correct</th>
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
            
            {allExamRecords}
        </>
    )

}

export default MyProgress;