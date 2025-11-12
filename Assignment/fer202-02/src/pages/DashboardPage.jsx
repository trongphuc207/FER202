import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';
import AddExpenseForm from '../components/AddExpenseForm';
import { usePayment } from '../contexts/PaymentContext';

const DashboardPage = () => {
    const { totalExpense, filterCategory, setFilterCategory, categoryOptions, filteredPayments } = usePayment();

    const totalFormatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(totalExpense);

    return (
        <>
            <NavigationHeader />
            <Container className="my-4">
                <Row className="mb-4 g-4">
                    <Col xs={12} md={6} lg={4}>
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <Card.Title className="text-uppercase text-muted small mb-2">
                                    Total of Expenses
                                </Card.Title>
                                <Card.Text className="fs-3 fw-bold text-primary mb-1">
                                    {totalFormatted}
                                </Card.Text>
                                <div className="text-muted small">
                                    {filteredPayments.length} expense(s) in view
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={8}>
                        <FilterBar
                            value={filterCategory}
                            onChange={setFilterCategory}
                            suggestions={categoryOptions}
                        />
                    </Col>
                </Row>
                <Row className="g-4">
                    <Col xs={12} lg={4}>
                        <AddExpenseForm />
                    </Col>
                    <Col xs={12} lg={8}>
                        <Card className="mb-4 shadow-sm h-100">
                            <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                                <span>Expense Management</span>
                            </Card.Header>
                            <Card.Body>
                                <PaymentTable />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default DashboardPage;
