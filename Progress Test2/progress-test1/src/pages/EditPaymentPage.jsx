import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchPaymentById,
    updatePayment,
    clearCurrentPayment,
    selectCurrentPayment,
    selectPaymentsActionStatus,
    selectPaymentsActionError,
} from '../store/paymentsSlice';

const EditPaymentPage = () => {
    const { paymentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentPayment = useSelector(selectCurrentPayment);
    const actionStatus = useSelector(selectPaymentsActionStatus);
    const actionError = useSelector(selectPaymentsActionError);
    const [formData, setFormData] = useState({
        semester: '',
        courseName: '',
        amount: '',
        date: '',
    });

    useEffect(() => {
        if (paymentId) {
            dispatch(fetchPaymentById(paymentId));
        }
        return () => {
            dispatch(clearCurrentPayment());
        };
    }, [dispatch, paymentId]);

    useEffect(() => {
        if (currentPayment) {
            setFormData({
                semester: currentPayment.semester || '',
                courseName: currentPayment.courseName || '',
                amount: currentPayment.amount || '',
                date: currentPayment.date ? currentPayment.date.split('T')[0] : '',
            });
        }
    }, [currentPayment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const paymentData = {
            semester: formData.semester,
            courseName: formData.courseName,
            amount: parseFloat(formData.amount),
            date: formData.date,
            ...(currentPayment?.userId && { userId: currentPayment.userId }),
        };
        try {
            await dispatch(updatePayment({ id: paymentId, paymentData })).unwrap();
            navigate(`/payments/${paymentId}`);
        } catch (err) {
            console.error('Failed to update payment:', err);
        }
    };

    if (!currentPayment && actionStatus === 'loading') {
        return (
            <>
                <NavigationHeader />
                <Container className="my-4">
                    <div>Đang tải dữ liệu thanh toán...</div>
                </Container>
            </>
        );
    }

    if (!currentPayment) {
        return (
            <>
                <NavigationHeader />
                <Container className="my-4">
                    <Button variant="primary" onClick={() => navigate('/home')}>
                        Quay lại
                    </Button>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavigationHeader />
            <Container className="my-4">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card>
                            <Card.Header as="h4">Chỉnh Sửa Thanh Toán</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Semester</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="semester"
                                            value={formData.semester}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Course Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="courseName"
                                            value={formData.courseName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <div className="d-flex justify-content-end gap-2">
                                        <Button variant="secondary" onClick={() => navigate(`/payments/${paymentId}`)}>
                                            Hủy
                                        </Button>
                                        <Button variant="primary" type="submit" disabled={actionStatus === 'loading'}>
                                            {actionStatus === 'loading' ? 'Đang lưu...' : 'Cập nhật'}
                                        </Button>
                                    </div>
                                    {actionError && (
                                        <div className="text-danger mt-3">{actionError}</div>
                                    )}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default EditPaymentPage;

