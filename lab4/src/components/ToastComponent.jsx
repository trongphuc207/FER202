
import React from 'react';  
import { Toast, ToastContainer, Button } from 'react-bootstrap';
function ToastComponent({ show, handleClose, title, body }) {
    return (
    <ToastContainer position="top-end" className="p-3">
        <Toast onClose={handleClose} show={show} delay={2000} autohide>
        <Toast.Header>
            <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{body}</Toast.Body>
        </Toast>
    </ToastContainer>
    );
}
export default ToastComponent;