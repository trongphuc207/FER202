import React, { useEffect } from 'react';
import { Container, Card, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchPaymentById,
    clearCurrentPayment,
    selectCurrentPayment,
    selectPaymentsActionStatus,
} from '../store/paymentsSlice';

const ViewDetailsPage = () => {
    const { paymentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentPayment = useSelector(selectCurrentPayment);
    const actionStatus = useSelector(selectPaymentsActionStatus);

    useEffect(() => {
        if (paymentId) {
            dispatch(fetchPaymentById(paymentId));
        }
        return () => {
            dispatch(clearCurrentPayment());
        };
    }, [dispatch, paymentId]);

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
                day: '2-digit',
            }).format(date);
        } catch (error) {
            return dateString;
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
                            <Card.Header as="h4">Chi Tiết Thanh Toán</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <strong>ID:</strong> {currentPayment.id}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Semester:</strong> {currentPayment.semester}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Course Name:</strong> {currentPayment.courseName}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Amount:</strong> {formatAmount(currentPayment.amount)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Date:</strong> {formatDate(currentPayment.date)}
                                    </ListGroup.Item>
                                </ListGroup>

                                <div className="d-flex justify-content-end gap-2 mt-4">
                                    <Button variant="secondary" onClick={() => navigate('/home')}>
                                        Quay lại
                                    </Button>
                                    <Button variant="primary" onClick={() => navigate(`/payments/${paymentId}/edit`)}>
                                        Chỉnh sửa
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ViewDetailsPage;

