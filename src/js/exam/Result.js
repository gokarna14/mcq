import React from "react";
import Emphasize from "../animations/Emphasize";
import Modal from "react-modal/lib/components/Modal";
import { Link } from "react-router-dom";

const Result=(props)=>{

    const customStyles = {
        content: {
            marginTop: '2%',
            right: '30%',
            height: '100%',
        },
        overlay:{
            backgroundColor: "rgba(233,150,122,0.3)",
            overflowY: "scroll",
        zIndex: "1000",

         }
      };

    return (
        <>
        <Modal
                isOpen={props.showResult}
                style={customStyles}
                onRequestClose={()=>{props.setShowResult(false)}}
                className=""
            >
                <hr />
                    <h1>Result</h1>
                    <h4>Your Final Score: {props.score} out of {props.numberOfQuestion}</h4>
                    <form>
                        <Link
                            onClick={()=>{props.setShowResult(false)}}
                            className='btn btn-outline-dark'
                            refresh="true"
                            to={props.fromMcq ? "./.." : ""}
                        >Close</Link>
                    </form>
                <hr />
                {
                    props.fullResponse.map(
                        responseSet=>{
                            return(
                                <>
                                <b>
                                    <i>{responseSet.correct.toUpperCase() === 'TRUE' ? '✅' : '❌'}</i>
                                </b>
                                <br />
                                    <b>{responseSet.question}</b>
                                    <br />
                                    <i>Your Response: </i>
                                    {responseSet.answered_option}
                                    <br />
                                    <i>Correct Answer: </i>
                                    {responseSet.right_answer}
                                    <br />
                                    <hr />
                                </>
                            )
                        }
                    )
                }
                {
                    !props.universalProps.userLoggedIn &&
                    <>
                        <Emphasize
                            content={
                                <>You need to login to see the full result from next time!
                                </>
                            }
                        ></Emphasize>
                    </>
                }
        </Modal>

    </>
    )

}

export default Result;