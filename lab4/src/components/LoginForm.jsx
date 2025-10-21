//LoginForm component is used to render a login form with username and password fields, including validation and error handling.
import { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';

// Initial state
const initialState = {
  username: '',
  password: '',
  errors: {},
  showModal: false,
};

// Reducer function
function loginReducer(state, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      const newUsernameErrors = { ...state.errors };
      if (action.payload.trim() === '') {
        newUsernameErrors.username = 'Username is required';
      } else {
        delete newUsernameErrors.username;
      }
      return {
        ...state,
        username: action.payload,
        errors: newUsernameErrors
      };
    case 'SET_PASSWORD':
      const newPasswordErrors = { ...state.errors };
      if (action.payload.trim() === '') {
        newPasswordErrors.password = 'Password is required';
      } else {
        delete newPasswordErrors.password;
      }
      return {
        ...state,
        password: action.payload,
        errors: newPasswordErrors
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'SHOW_MODAL':
      return { ...state, showModal: true };
    case 'CLOSE_MODAL':
      return {
        ...state,
        showModal: false,
        username: '',
        password: '',
        errors: {}
      };
    default:
      return state;
  }
}

function LoginForm({ onSubmit }) {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, errors, showModal } = state;

  //Xử lý thay đổi input
  const handleUsernameChange = (e) => {
    dispatch({ type: 'SET_USERNAME', payload: e.target.value });
  };

  //Xử lý thay đổi password
  const handlePasswordChange = (e) => {
    dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
  };

  //Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    const newErrors = {};       
    if (username.trim() === '') {
      newErrors.username = 'Username is required';
    }
    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: newErrors });
    } else {
      //onSubmit?.({ username, password });
      dispatch({ type: 'SHOW_MODAL' }); // Hiển thị modal khi không có lỗi
    }
  };

  //Đóng modal
  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>  
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    type="text"
                    value={username}
                    onChange={handleUsernameChange} 
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">  
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password"
                    value={password}
                    onChange={handlePasswordChange} 
                    isInvalid={!!errors.password}   
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>   
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Modal hiển thị khi đăng nhập thành công */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome, {username}!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LoginForm;
