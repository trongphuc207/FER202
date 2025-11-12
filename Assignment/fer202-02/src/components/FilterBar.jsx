import React from 'react';
import { Card, Form } from 'react-bootstrap';

const FilterBar = ({ value, onChange, suggestions = [] }) => {
    const handleSelectChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Form>
                    <Form.Group controlId="filterCategory">
                        <Form.Label>Filter by Category</Form.Label>
                        <Form.Select value={value} onChange={handleSelectChange}>
                            <option value="">All categories</option>
                            {suggestions.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterBar;
