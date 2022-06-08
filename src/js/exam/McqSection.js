import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import Timer from "./Timer";


const McqSection=(props)=>{

    const [modalIsOpen, setIsOpen] = useState(false);
    

    function openModal() {
        setIsOpen(true);
        axios.post('/api/loadQuestions', {
            for: props.type
        })
        .then(
            res=>{
                console.log(res);
            }
        )
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
        overlay:{
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,255,255,0.3)",
            zIndex: "1000",
            overflowY: "auto"
          }
      };
    
    const handleTimeOff=()=>{
        console.log('Time Up !');
    }
    

    return(
        <>
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
                <Timer
                seconds = {500}
                handleTimeOff = {handleTimeOff}
                ></Timer>
                <h1>
                    Questions Appear Here
                </h1>

            <button className="btn btn-warning"
                    onClick={closeModal}
            >Submit</button>

            </Modal>
            
        </>
    )
}

export default McqSection;