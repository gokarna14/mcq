import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import Timer from "./Timer";
import LoadingModal from "../templates/LoadingModal";


const McqSection=(props)=>{

    const [modalIsOpen, setIsOpen] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [response, setResponse] = useState({})
    const [fullResponse, setFullResponse] = useState([])
    const [showResult, setShowResult] = useState(false);
    const [displayLoadingModal, setDisplayLoadingModal] = useState(false)
    // const [responseID, setResponseID] = useState(null)
    const [score, setScore] = useState(0)

    function openModal() {
        setIsOpen(true);
        setResponse({});
        setQuestions([]);
        axios.post('/api/loadQuestions', {
            for: props.type,
            limit: props.numberOfQuestions
        })
        .then(
            res=>{
                // console.log(res.data);
                setQuestions(res.data);
                // console.log(props.universalProps);
                // console.log(questions);
            }
        )
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
                            // console.log(response.data); // todo: generate result
                            setFullResponse(response.data.response);
                            setScore(response.data.score)
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
        //   top: '50%',
        //   left: '50%',
        //   right: 'auto',
        //   bottom: 'auto',
        //   marginRight: '-50%',
        //   transform: 'translate(-50%, -50%)',
            marginTop: '2%',
            height: '100%'
        },
        overlay:{
            // position: "fixed",
            // display: "flex",
            // justifyContent: "center",
            // top: "0",
            // left: "0",
            // width: "100%",
            // height: "100%",
            backgroundColor: "rgba(0,255,255,0.3)",
            // zIndex: "1000",
            overflowY: "scroll",
            // overflowX: 'scroll'
          }
      };
    
    const handleTimeOff=()=>{
        console.log('Time Up !');
    }

    

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
    
    const resultDisplay = // get this mf into separate js
    <>
            {
                fullResponse.map(
                    responseSet=>{
                        return(
                            <>
                                <b>{responseSet.question}</b>
                                
                                <br />
                                <i>Your Response: </i>
                                {responseSet.answered_option}
                                <br />
                                <i>Correct Answer: </i>
                                {responseSet.right_answer}
                                <br />
                                <h1>{responseSet.correct}</h1>
                                
                                <hr />
                            </>
                        )
                    }
                )
            }
    </>

    return(
        <>
            <LoadingModal
                text={'Loading Result'}
                open={displayLoadingModal}
            ></LoadingModal>

        <br />
            This is mcq section for {props.type}
            <br />

            <button className="btn btn-danger"
                    onClick={openModal}
            >
                Start the {props.type} exam.
            </button>

            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <hr />
                <Timer
                seconds = {500}
                handleTimeOff = {handleTimeOff}
                style = {{position:'absolute'}}
                ></Timer>
                    {renderQuestion}
            <button className="btn btn-warning"
                    onClick={closeModal}
            >Submit</button>
            </Modal>

            <Modal
                isOpen={showResult}
                style={customStyles}
            >
                <hr />
                    <h1>Result</h1>
                    <h4>Your Final Score: {score} out of {props.numberOfQuestion}</h4>
                    <button
                        onClick={()=>{setShowResult(false)}}
                    >close</button>
                <hr />
                {resultDisplay}
            </Modal>
            
        </>
    )
}

export default McqSection;