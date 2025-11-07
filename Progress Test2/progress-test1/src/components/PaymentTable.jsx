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

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(date);
        } catch (error) {
            return dateString;
        }
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

    // Tính tổng tiền
    const totalAmount = payments.reduce((sum, payment) => {
        return sum + (payment.amount || 0);
    }, 0);

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
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.semester}</td>
                            <td>{payment.courseName}</td>
                            <td>{formatAmount(payment.amount)}</td>
                            <td>{formatDate(payment.date)}</td>
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
                <tfoot>
                    <tr style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold' }}>
                        <td colSpan="2" style={{ textAlign: 'right' }}>
                            <strong>Tổng tiền:</strong>
                        </td>
                        <td>
                            <strong>{formatAmount(totalAmount)}</strong>
                        </td>
                        <td colSpan="2"></td>
                    </tr>
                </tfoot>
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

