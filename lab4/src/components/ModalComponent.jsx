// Tạo 1 ModalComponent dùng useReducer dùng chung cho LoginForm và SignUpForm
import React from 'react';
import { Modal, Button } from 'react-bootstrap';   
function ModalComponent({ show, handleClose, title, body }) {
  return (
    <Modal show={show} onHide={handleClose}>   
        <Modal.Header closeButton>  
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
     

