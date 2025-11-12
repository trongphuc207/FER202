import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';

const getInitialState = () => ({
    name: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
});

const AddExpenseForm = () => {
    const { createPayment, categoryOptions } = usePayment();
    const [formData, setFormData] = useState(getInitialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const validate = () => {
        const validationErrors = {};
        if (!formData.name.trim()) {
            validationErrors.name = 'Name is required.';
        }
        const amountNumber = Number(formData.amount);
        if (!formData.amount.trim()) {
            validationErrors.amount = 'Amount is required.';
        } else if (Number.isNaN(amountNumber) || amountNumber <= 0) {
            validationErrors.amount = 'Amount must be a number greater than 0.';
        }
        if (!formData.category.trim()) {
            validationErrors.category = 'Category is required.';
        }
        if (!formData.date) {
            validationErrors.date = 'Date is required.';
        }
        return { validationErrors, amountNumber };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { validationErrors, amountNumber } = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            await createPayment({
                name: formData.name.trim(),
                amount: amountNumber,
                category: formData.category.trim(),
                date: formData.date,
            });
            setFormData(getInitialState());
            setErrors({});
        } catch (error) {
            console.error('Failed to create payment', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData(getInitialState());
        setErrors({});
    };

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Add Expense</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="expenseName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Expense name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="expenseAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount"
                            placeholder="0"
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

                    <Form.Group className="mb-3" controlId="expenseCategory">
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

                    <Form.Group className="mb-4" controlId="expenseDate">
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

                    <div className="d-flex gap-2">
                        <Button variant="secondary" type="button" onClick={handleReset} className="flex-fill">
                            Reset
                        </Button>
                        <Button variant="primary" type="submit" className="flex-fill" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default AddExpenseForm;

