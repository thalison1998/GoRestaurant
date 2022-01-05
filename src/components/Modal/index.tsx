import React from 'react'
import ReactModal from 'react-modal'; 
import { ModalProps } from "../../types";



export const Modal = ({
    isOpen,
    setIsOpen,
    children,
  }:  ModalProps) => {
   

    return (
        <ReactModal 
        isOpen={isOpen}
        onRequestClose={setIsOpen}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={!false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }} >
            {children}
        </ReactModal>
    )
}
