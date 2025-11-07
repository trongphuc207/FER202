import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleAddPayment = () => {
        navigate('/payments/add');
    };

    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />
            {/* 2. Main Dashboard Content (Grid và Card) */}
            <Container className="my-4">
                <FilterBar />
                        <Card className="mb-4">
                    <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                        <span>Danh Sách Thanh Toán</span>
                        <Button variant="primary" onClick={handleAddPayment}>
                            + Thêm Thanh Toán
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <PaymentTable />
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default DashboardPage;
