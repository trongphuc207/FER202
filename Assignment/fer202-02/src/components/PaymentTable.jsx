import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

const PaymentTable = () => {
    const { filteredPayments, deletePayment } = usePayment();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatDate = (date) => {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
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

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setPaymentToDelete(null);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPayments.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center text-muted">
                                No expenses found.
                            </td>
                        </tr>
                    ) : (
                        filteredPayments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{payment.name}</td>
                                <td>{formatAmount(payment.amount)}</td>
                                <td>{payment.category}</td>
                                <td>{formatDate(payment.date)}</td>
                                <td>
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
                        ))
                    )}
                </tbody>
            </Table>

            <ConfirmModal
                show={showDeleteModal}
                title="Xác nhận xóa"
                message={`Xóa khoản chi "${paymentToDelete?.name}"?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCloseModal}
            />
        </>
    );
};

export default PaymentTable;

