import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import Timer from "./Timer";
import LoadingModal from "../templates/LoadingModal";
import Emphasize from "../animations/Emphasize";
import Result from "./Result";
import { Link } from "react-router-dom";
// import { JSXExamDescription } from "../essentials/exam/examEssentials";

const McqSection=(props)=>{

    const seconds = {
        'quick' : 300,
        'normal': 1000
    }

    const [modalIsOpen, setIsOpen] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [response, setResponse] = useState({})
    const [fullResponse, setFullResponse] = useState([])
    const [showResult, setShowResult] = useState(false);
    const [displayLoadingModal, setDisplayLoadingModal] = useState(false)
    // const [responseID, setResponseID] = useState(null)
    const [showInstructions, setShowInstructions] = useState(true)
    const [score, setScore] = useState(0)

    function openModal() {
        setIsOpen(true);
        setResponse({});
        setQuestions([]);
        axios.post('/api/loadQuestions', {
            for: props.type,
            limit: props.numberOfQuestion
        })
        .then(
            res=>{
                setQuestions(res.data);
            }
        )
        setShowInstructions(false);
    }

    const closeModal=()=>{
        setIsOpen(false);
        setDisplayLoadingModal(true);
        var responded = Object.keys(response).length > 0;
        if (responded && props.universalProps.userLoggedIn){
            var user_id = props.universalProps.userInf.user_id;
            console.log(`User id ${user_id}`);
            axios.post('/api/recordUserResponse', {
                userInf: props.universalProps.userInf,
                response: response,
                type: props.type
            })
            .then(
                async (res)=>{
                    var response_id = await res.data;
                    console.log(response_id);
                    // setResponseID(response_id);
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
                }
            )
        }
        if (!responded){
            console.log(`You did not respond anything you piece of shit`);
        }

        
        setDisplayLoadingModal(false);
        setShowResult(true);
    }

    const customStyles = {
        content: {
            marginTop: '2%',
            height: '100%'
        },
        overlay:{
            backgroundColor: "rgba(0,255,255,0.3)",
            overflowY: "scroll",
          }
      };
    
    const handleTimeOff=()=>{
        closeModal();
    }

        console.log( props.numberOfQuestion);
    

    const questionLoop = questions.map(
        questionSet => {
            var options = {
                '0': questionSet.right_answer,
                '1': questionSet.option1,
                '2': questionSet.option2,
                '3': questionSet.option3,
            }
            return (
                <>
                    <div className="">
                        {questionSet.question}
                    </div>

                    {
                        Object.keys(options)
                        .map(value => ({ value, sort: Math.random() }))
                        .sort((a, b) => a.sort - b.sort)
                        .map(({ value }) => value)
                        .map(
                            optionKey=>{
                                return(
                                    <i>
                                        <input  type="radio" 
                                                value={optionKey}
                                                name={questionSet.question_id}
                                                onChange={(e)=>{
                                                    let temp = response
                                                    temp[questionSet.question_id] = e.target.value
                                                    setResponse(temp)
                                                    console.log(temp);
                                                }}
                                        />
                                        {options[optionKey]}
                                        <br />
                                    </i>
                                )
                            }
                        )
                    }
                    <hr />
                    
                </>
                )
        }
    )

    const renderQuestion = <div>
            {
            questions.length < 1 ?
            <>
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
                    Loading Questions 
            </>:
            <>
                <hr />
                <>
                    {questionLoop}
                </>
            </>

            }
    </div>
    
    const JSXExamDescription = {
        'quick': 
        <>
            <Emphasize
                content=
                {<>
                    This is the quick exam.
                </>}
            >
            </Emphasize>
            <div className="jumbotron">
                <p className="display-6">
                    <i>
                        <b>
                            What kind of questions should you expect from Quick Exam?
                        </b>
                    </i>
                </p>
            </div>
            
        </>,
        'normal': 
        <>
            <Emphasize
                content=
                {<>
                    hello
                </>}
            >
            </Emphasize>
        </>,
    }
    
    const instructions=
    <Modal
        isOpen={showInstructions}
        style={customStyles}
    >
        <h4>What is quick exam?</h4>
        <button className="btn btn-danger"
                    onClick={openModal}
            >
                Start the {props.type} exam.
        </button>
                <hr />
                {JSXExamDescription['quick']}

                <Link
                    to={'./..'}
                    className='btn btn-primary'
                >Cancel
                </Link>
        
    </Modal>

    return(
        <>
            <LoadingModal
                text={'Loading Result'}
                open={displayLoadingModal}
            ></LoadingModal>

        <br />
            This is mcq section for {props.type}
            <br />
            {instructions}
            
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <hr />
                <Timer
                seconds = {props.seconds ? props.seconds : 500}
                handleTimeOff = {handleTimeOff}
                style = {{position:'absolute'}}
                text={'Your work will be automatically submitted once the time is over.'}
                ></Timer>
                    {renderQuestion}
            <button className="btn btn-warning"
                    onClick={closeModal}
            >Submit</button>
            </Modal>
                <Result
                    fullResponse = {fullResponse}
                    universalProps = {props.universalProps}
                    numberOfQuestion = {props.numberOfQuestion}
                    setShowResult = {setShowResult}
                    score={score}
                    showResult={showResult}
                    fromMcq={true}
                ></Result>
            
        </>
    )
}

export default McqSection;