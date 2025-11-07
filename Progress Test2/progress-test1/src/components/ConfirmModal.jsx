//ConfirmModal.jsx được dùng để hiển thị một modal xác nhận hành động
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
const ConfirmModal = ({ show, title, message, onConfirm, onHide }) => {
    const handleClose = () => {
        if (onHide) {
            onHide();
        } else if (onConfirm) {
            onConfirm();
        }
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                {onConfirm && (
                    <Button variant="primary" onClick={handleConfirm}>
                        Xác nhận    
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
