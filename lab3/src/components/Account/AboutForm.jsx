import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function AboutForm({ formData, setFormData, errors }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <h4 className="form-section-title">
        <i className="bi bi-person-circle me-2"></i>
        About
      </h4>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">
              <i className="bi bi-person me-1"></i>
              First Name *
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.firstName || ''}
              onChange={(e) => handleChange('firstName', e.target.value)}
              isInvalid={!!errors.firstName}
              placeholder="Enter your first name"
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">
              <i className="bi bi-person me-1"></i>
              Last Name *
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.lastName || ''}
              onChange={(e) => handleChange('lastName', e.target.value)}
              isInvalid={!!errors.lastName}
              placeholder="Enter your last name"
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="form-label">
          <i className="bi bi-envelope me-1"></i>
          Email *
        </Form.Label>
        <Form.Control
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          isInvalid={!!errors.email}
          placeholder="Enter your email address"
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">
              <i className="bi bi-telephone me-1"></i>
              Phone *
            </Form.Label>
            <Form.Control
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              isInvalid={!!errors.phone}
              placeholder="Enter your phone number"
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">
              <i className="bi bi-calendar3 me-1"></i>
              Age *
            </Form.Label>
            <Form.Control
              type="number"
              min="13"
              max="120"
              value={formData.age || ''}
              onChange={(e) => handleChange('age', parseInt(e.target.value))}
              isInvalid={!!errors.age}
              placeholder="Enter your age"
            />
            <Form.Control.Feedback type="invalid">
              {errors.age}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="form-label">
          <i className="bi bi-image me-1"></i>
          Avatar
        </Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => handleChange('avatar', e.target.files[0])}
          className="form-control-file"
        />
        <Form.Text className="text-muted">
          Upload a profile picture (optional)
        </Form.Text>
      </Form.Group>
    </div>
  );
}
