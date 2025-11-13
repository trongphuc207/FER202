import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment, selectPaymentsActionStatus, selectPaymentsActionError } from '../store/paymentsSlice';
import { useAuth } from '../contexts/AuthContext';

const AddPaymentPage = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const actionStatus = useSelector(selectPaymentsActionStatus);
    const actionError = useSelector(selectPaymentsActionError);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        semester: '',
        courseName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
    });

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
            userId: user?.id,
        };
        try {
            await dispatch(createPayment(paymentData)).unwrap();
            navigate('/home');
        } catch (err) {
            console.error('Failed to create payment:', err);
        }
    };

    return (
        <>
            <NavigationHeader />
            <Container className="my-4">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card>
                            <Card.Header as="h4">Thêm Thanh Toán</Card.Header>
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
                                        <Button variant="secondary" onClick={() => navigate('/home')}>
                                            Hủy
                                        </Button>
                                        <Button variant="primary" type="submit" disabled={actionStatus === 'loading'}>
                                            {actionStatus === 'loading' ? 'Đang lưu...' : 'Thêm'}
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

export default AddPaymentPage;

