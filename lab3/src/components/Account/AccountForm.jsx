import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function AccountForm({ formData, setFormData, errors }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <h4 className="form-section-title">
        <i className="bi bi-lock me-2"></i>
        Account
      </h4>
      
      <Form.Group className="mb-3">
        <Form.Label className="form-label">
          <i className="bi bi-person me-1"></i>
          Username *
        </Form.Label>
        <InputGroup>
          <InputGroup.Text className="input-group-icon">
            <i className="bi bi-person"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            value={formData.username || ''}
            onChange={(e) => handleChange('username', e.target.value)}
            isInvalid={!!errors.username}
            placeholder="Choose a username"
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="form-label">
          <i className="bi bi-shield-lock me-1"></i>
          Password *
        </Form.Label>
        <InputGroup>
          <InputGroup.Text className="input-group-icon">
            <i className="bi bi-lock"></i>
          </InputGroup.Text>
          <Form.Control
            type="password"
            value={formData.password || ''}
            onChange={(e) => handleChange('password', e.target.value)}
            isInvalid={!!errors.password}
            placeholder="Create a strong password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </InputGroup>
        <Form.Text className="text-muted">
          Password must be at least 6 characters long
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="form-label">
          <i className="bi bi-shield-check me-1"></i>
          Confirm Password *
        </Form.Label>
        <InputGroup>
          <InputGroup.Text className="input-group-icon">
            <i className="bi bi-lock-fill"></i>
          </InputGroup.Text>
          <Form.Control
            type="password"
            value={formData.confirmPassword || ''}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            isInvalid={!!errors.confirmPassword}
            placeholder="Confirm your password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="form-label">
          <i className="bi bi-question-circle me-1"></i>
          Secret Question *
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.secretQuestion || ''}
          onChange={(e) => handleChange('secretQuestion', e.target.value)}
          isInvalid={!!errors.secretQuestion}
          placeholder="e.g., What was your first pet's name?"
        />
        <Form.Control.Feedback type="invalid">
          {errors.secretQuestion}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          This will be used for account recovery
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="form-label">
          <i className="bi bi-key me-1"></i>
          Answer *
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.answer || ''}
          onChange={(e) => handleChange('answer', e.target.value)}
          isInvalid={!!errors.answer}
          placeholder="Your answer to the secret question"
        />
        <Form.Control.Feedback type="invalid">
          {errors.answer}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
}
