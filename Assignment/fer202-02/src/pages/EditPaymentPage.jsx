import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';

const EditPaymentPage = () => {
    const { paymentId } = useParams();
    const navigate = useNavigate();
    const { currentPayment, fetchPaymentById, updatePayment, categoryOptions } = usePayment();
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        date: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (paymentId) {
            fetchPaymentById(paymentId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentId]);

    useEffect(() => {
        if (currentPayment) {
            setFormData({
                name: currentPayment.name || '',
                amount: currentPayment.amount?.toString() || '',
                category: currentPayment.category || '',
                date: currentPayment.date || '',
            });
        }
    }, [currentPayment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!formData.name.trim()) {
            validationErrors.name = 'Name is required.';
        }
        if (!formData.category.trim()) {
            validationErrors.category = 'Category is required.';
        }
        const amountNumber = Number(formData.amount);
        if (!formData.amount.trim()) {
            validationErrors.amount = 'Amount is required.';
        } else if (Number.isNaN(amountNumber) || amountNumber <= 0) {
            validationErrors.amount = 'Amount must be a number greater than 0.';
        }
        if (!formData.date) {
            validationErrors.date = 'Date is required.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const paymentData = {
            name: formData.name.trim(),
            category: formData.category.trim(),
            amount: amountNumber,
            date: formData.date,
            ...(currentPayment?.userId && { userId: currentPayment.userId }),
        };
        try {
            setIsSubmitting(true);
            await updatePayment(paymentId, paymentData);
            navigate('/home');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!currentPayment) {
        return (
            <>
                <NavigationHeader />
                <Container className="my-4">
                    <div className="d-flex align-items-center gap-3">
                        <Spinner animation="border" />
                        <span>Loading expense...</span>
                    </div>
                    <div className="mt-3">
                        <Button variant="secondary" onClick={() => navigate('/home')}>
                            Back to dashboard
                        </Button>
                    </div>
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
                            <Card.Header as="h4">Edit Expense</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                            placeholder="Expense name"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            isInvalid={!!errors.category}
                                        >
                                            <option value="">Select category</option>
                                            {categoryOptions.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.category}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            isInvalid={!!errors.amount}
                                            min="0"
                                            step="1000"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.amount}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            isInvalid={!!errors.date}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.date}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <div className="d-flex justify-content-end gap-2">
                                        <Button variant="secondary" onClick={() => navigate('/home')}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? 'Updating...' : 'Update'}
                                        </Button>
                                    </div>
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

