import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

const PaymentTable = () => {
    const { payments, deletePayment } = usePayment();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handleDeleteClick = (payment) => {
        setPaymentToDelete(payment);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (paymentToDelete) {
            await deletePayment(paymentToDelete.id);
            setShowDeleteModal(false);
            setPaymentToDelete(null);
        }
    };

    if (payments.length === 0) {
        return <div>Chưa có thanh toán nào</div>;
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Semester</th>
                        <th>Course</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.semester}</td>
                            <td>{payment.courseName}</td>
                            <td>{formatAmount(payment.amount)}</td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => navigate(`/payments/${payment.id}`)}
                                >
                                    View Details
                                </Button>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => navigate(`/payments/${payment.id}/edit`)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDeleteClick(payment)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ConfirmModal
                show={showDeleteModal}
                title="Xác nhận xóa"
                message={`Xóa thanh toán "${paymentToDelete?.courseName}"?`}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
};

export default PaymentTable;

