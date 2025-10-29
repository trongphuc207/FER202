//tạo 1 ConfirmModal dùng useReducer dùng chung co loginForm và register formmponent
import React from 'react';
import { Modal, Button } from 'react-bootstrap';    
function ConfirmModal({ show, handleClose, title, message }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
            </Button>
        </Modal.Footer>
      </Modal>
  );
}
export default ConfirmModal;