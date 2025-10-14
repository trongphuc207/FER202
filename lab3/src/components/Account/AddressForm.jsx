import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function AddressForm({ formData, setFormData, errors }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <h4 className="form-section-title">
        <i className="bi bi-geo-alt me-2"></i>
        Address
      </h4>
      
      <Form.Group className="mb-3">
        <Form.Label className="form-label">
          <i className="bi bi-house me-1"></i>
          Street Address *
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.street || ''}
          onChange={(e) => handleChange('street', e.target.value)}
          isInvalid={!!errors.street}
          placeholder="Enter your street address"
        />
        <Form.Control.Feedback type="invalid">
          {errors.street}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">
              <i className="bi bi-building me-1"></i>
              City *
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              isInvalid={!!errors.city}
              placeholder="Enter your city"
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">
              <i className="bi bi-globe me-1"></i>
              Country *
            </Form.Label>
            <Form.Select
              value={formData.country || ''}
              onChange={(e) => handleChange('country', e.target.value)}
              isInvalid={!!errors.country}
            >
              <option value="">Select Country</option>
              <option value="US">🇺🇸 United States</option>
              <option value="UK">🇬🇧 United Kingdom</option>
              <option value="CA">🇨🇦 Canada</option>
              <option value="AU">🇦🇺 Australia</option>
              <option value="DE">🇩🇪 Germany</option>
              <option value="FR">🇫🇷 France</option>
              <option value="JP">🇯🇵 Japan</option>
              <option value="KR">🇰🇷 South Korea</option>
              <option value="VN">🇻🇳 Vietnam</option>
              <option value="SG">🇸🇬 Singapore</option>
              <option value="TH">🇹🇭 Thailand</option>
              <option value="MY">🇲🇾 Malaysia</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.country}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="form-label">
          <i className="bi bi-mailbox me-1"></i>
          Zip Code *
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.zipCode || ''}
          onChange={(e) => handleChange('zipCode', e.target.value)}
          isInvalid={!!errors.zipCode}
          placeholder="Enter your zip code"
        />
        <Form.Control.Feedback type="invalid">
          {errors.zipCode}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          Enter a valid zip code (e.g., 12345 or 12345-6789)
        </Form.Text>
      </Form.Group>
    </div>
  );
}
