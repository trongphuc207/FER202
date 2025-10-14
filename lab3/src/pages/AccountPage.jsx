import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import AboutForm from '../components/Account/AboutForm';
import AccountForm from '../components/Account/AccountForm';
import AddressForm from '../components/Account/AddressForm';
import './AccountPage.css';

export default function AccountPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'About', component: AboutForm },
    { id: 2, title: 'Account', component: AccountForm },
    { id: 3, title: 'Address', component: AddressForm }
  ];

  const getProgress = () => {
    switch (currentStep) {
      case 1: return 33;
      case 2: return 67;
      case 3: return 100;
      default: return 0;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.age) {
        newErrors.age = 'Age is required';
      } else if (formData.age < 13 || formData.age > 120) {
        newErrors.age = 'Age must be between 13 and 120';
      }
    } else if (step === 2) {
      if (!formData.username?.trim()) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.secretQuestion?.trim()) newErrors.secretQuestion = 'Secret question is required';
      if (!formData.answer?.trim()) newErrors.answer = 'Answer is required';
    } else if (step === 3) {
      if (!formData.street?.trim()) newErrors.street = 'Street address is required';
      if (!formData.city?.trim()) newErrors.city = 'City is required';
      if (!formData.country) newErrors.country = 'Please select a country';
      if (!formData.zipCode?.trim()) {
        newErrors.zipCode = 'Zip code is required';
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
        newErrors.zipCode = 'Please enter a valid zip code';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFinish = () => {
    if (validateStep(currentStep)) {
      alert('Account created successfully!');
      // Handle form submission here
    }
  };

  const CurrentForm = steps.find(step => step.id === currentStep)?.component;

  return (
    <div className="account-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="wizard-container">
              {/* Header Section */}
              <div className="wizard-header text-center mb-5">
                <h2 className="display-5 fw-bold text-primary mb-3">
                  <i className="bi bi-person-badge me-3"></i>
                  Build Your Account
                </h2>
                <p className="lead text-muted">
                  Complete your profile in 3 simple steps
                </p>
              </div>

              {/* Progress Section */}
              <div className="progress-section mb-4">
                <div className="progress-container">
                  <ProgressBar 
                    now={getProgress()} 
                    className="progress-bar-custom"
                    label={`${getProgress()}%`}
                  />
                  <div className="progress-steps">
                    {steps.map((step, index) => (
                      <div 
                        key={step.id}
                        className={`progress-step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                      >
                        <div className="step-number">
                          {currentStep > step.id ? (
                            <i className="bi bi-check"></i>
                          ) : (
                            step.id
                          )}
                        </div>
                        <div className="step-title">{step.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <Card className="wizard-card shadow-lg border-0">
                <Card.Header className="wizard-card-header">
                  <h4 className="mb-0">
                    <i className={`bi ${currentStep === 1 ? 'bi-person-circle' : currentStep === 2 ? 'bi-lock' : 'bi-geo-alt'} me-2`}></i>
                    Step {currentStep}: {steps.find(s => s.id === currentStep)?.title}
                  </h4>
                </Card.Header>
                <Card.Body className="wizard-card-body">
                  {CurrentForm && (
                    <CurrentForm 
                      formData={formData} 
                      setFormData={setFormData} 
                      errors={errors} 
                    />
                  )}
                  
                  <div className="wizard-navigation mt-5">
                    <Button 
                      variant="outline-secondary" 
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className="nav-btn"
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Previous
                    </Button>
                    
                    {currentStep < 3 ? (
                      <Button 
                        variant="primary" 
                        onClick={handleNext}
                        className="nav-btn"
                      >
                        Next
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Button>
                    ) : (
                      <Button 
                        variant="success" 
                        onClick={handleFinish}
                        className="nav-btn"
                      >
                        <i className="bi bi-check-circle me-2"></i>
                        Finish
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
