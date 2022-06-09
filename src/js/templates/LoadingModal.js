import React, { useState } from "react";
import Modal from "react-modal/lib/components/Modal";


const LoadingModal=(props)=>{

    const [modalIsOpen, setIsOpen] = useState(false);



    function openModal() {
        setIsOpen(true);
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
            backgroundColor: "rgba(0,0,0, .8)",
            zIndex: "1000",
            overflowY: "auto"
          }
      };
    

    return(
        <>
             <Modal
                isOpen={props.open}
                onRequestClose={closeModal}
                style={customStyles}
            >
                {props.text}
            </Modal>
        </>
        )
}

export default LoadingModal;