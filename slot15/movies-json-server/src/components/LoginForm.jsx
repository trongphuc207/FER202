// src/components/LoginForm.jsx
import React, { useReducer, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from './ConfirmModal';

// 1. Khởi tạo trạng thái ban đầu cho form
const initialFormState = {
  identifier: '', // username hoặc email
  password: '',
  errors: {},
  showSuccessModal: false
};

// 2. Định nghĩa reducer cho form
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message }
      };
    case 'CLEAR_ERROR':
      const { [action.field]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      };
    case 'SHOW_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: true
      };
    case 'HIDE_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: false
      };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

const LoginForm = () => {
  // 3. Sử dụng useReducer cho form state
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  
  // 4. Sử dụng AuthContext
  const { login, loading, error, clearError, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 5. Validation helpers
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = (v) => v.includes('@');

  // Check authentication and redirect (chỉ redirect khi không có modal đang hiển thị)
  useEffect(() => {
    if (isAuthenticated() && !formState.showSuccessModal) {
      // Chỉ redirect nếu không phải từ modal (tức là từ lần load page đầu tiên)
      // Không redirect ngay sau khi login vì cần hiển thị modal trước
    }
  }, [isAuthenticated, formState.showSuccessModal, navigate]);

  // 6. Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Cập nhật giá trị field
    dispatch({ type: 'SET_FIELD', field: name, value });
    
    // Clear auth error khi user nhập
    clearError();

    // Validation real-time
    if (name === 'identifier') {
      if (!value.trim()) {
        dispatch({ type: 'SET_ERROR', field: name, message: 'Username or Email is required.' });
      } else if (isEmail(value) && !emailRe.test(value)) {
        dispatch({ type: 'SET_ERROR', field: name, message: 'Email is invalid format.' });
      } else {
        dispatch({ type: 'CLEAR_ERROR', field: name });
      }
    }

    if (name === 'password') {
      if (!value.trim()) {
        dispatch({ type: 'SET_ERROR', field: name, message: 'Password is required.' });
      } else {
        dispatch({ type: 'CLEAR_ERROR', field: name });
      }
    }
  };

  // 7. Validation form
  const validateForm = () => {
    const errors = {};
    
    if (!formState.identifier.trim()) {
      errors.identifier = 'Username or Email is required.';
    } else if (isEmail(formState.identifier) && !emailRe.test(formState.identifier)) {
      errors.identifier = 'Email is invalid format.';
    }
    
    if (!formState.password.trim()) {
      errors.password = 'Password is required.';
    }
    
    return errors;
  };

  // 8. Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    // Validate form
    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      // Gọi login từ AuthContext
      const result = await login(formState.identifier.trim(), formState.password);
      
      if (result.ok) {
        // Hiển thị modal thành công
        dispatch({ type: 'SHOW_SUCCESS_MODAL' });
      }
      // Lỗi sẽ được hiển thị qua AuthContext error
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // 9. Xử lý reset form
  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
    clearError();
  };

  // 10. Xử lý đóng modal thành công
  const handleCloseSuccessModal = () => {
    dispatch({ type: 'HIDE_SUCCESS_MODAL' });
    dispatch({ type: 'RESET_FORM' });
    // Navigate after closing modal
    if (isAuthenticated()) {
      navigate('/movies');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2>🎬 Đăng Nhập</h2>
                <p className="text-muted">Hệ Thống Quản Lý Phim</p>
              </div>

              {/* Hiển thị lỗi từ AuthContext */}
              {error && (
                <Alert variant="danger" className="mb-3" onClose={clearError} dismissible>
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group controlId="identifier" className="mb-3">
                  <Form.Label>Tên đăng nhập </Form.Label>
                  <Form.Control
                    type="text"
                    name="identifier"
                    value={formState.identifier}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.identifier}
                    placeholder="Nhập tên đăng nhập"
                    disabled={loading}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.identifier}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.password}
                    placeholder="Nhập mật khẩu"
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div style={{ display: 'flex', gap: 8, marginTop: '1rem' }}>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    style={{ flex: 1 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Đang xử lý...
                      </>
                    ) : (
                      'Đăng Nhập'
                    )}
                  </Button>
                  <Button 
                    variant="secondary" 
                    type="button" 
                    style={{ flex: 1 }}
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal thông báo thành công */}
      <ConfirmModal
        show={formState.showSuccessModal}
        title="Đăng Nhập Thành Công"
        message={`Chào mừng, ${user?.username || user?.email || 'bạn'}! Bạn đã đăng nhập thành công vào hệ thống quản lý phim!`}
        handleClose={handleCloseSuccessModal}
      />
    </Container>
  );
};

export default LoginForm;

