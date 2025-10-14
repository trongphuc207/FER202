import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './NavBar.css';

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesToast, setShowFavoritesToast] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchTerm);
  };

  const handleFavoritesClick = () => {
    setShowFavoritesToast(true);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">MovieHub</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
            <Nav.Link as={Link} to="/account">Account</Nav.Link>
          </Nav>

          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Quick search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-light" type="submit">
                Search
              </Button>
            </InputGroup>
          </Form>

          <Nav className="d-flex align-items-center">
            {/* Accounts Dropdown */}
            <Dropdown className="me-3">
              <Dropdown.Toggle variant="outline-light" id="dropdown-accounts">
                <i className="bi bi-person-circle me-1"></i>
                Accounts
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#" disabled>Manage Your Profiles</Dropdown.Item>
                <Dropdown.Item as={Link} to="/account">Build your Account</Dropdown.Item>
                <Dropdown.Item href="#" disabled>Change Password</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Login Button */}
            <Button variant="outline-light" className="me-2">
              <i className="bi bi-box-arrow-in-right me-1"></i>
              Login
            </Button>

            {/* Favourites Button */}
            <Button variant="outline-warning" onClick={handleFavoritesClick}>
              <i className="bi bi-heart me-1"></i>
              Favourites
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Favourites Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showFavoritesToast} 
          onClose={() => setShowFavoritesToast(false)}
          delay={3000}
          autohide
          className="favorites-toast"
        >
          <Toast.Header closeButton={false}>
            <i className="bi bi-heart-fill text-danger me-2"></i>
            <strong className="me-auto">Favourites</strong>
            <small className="text-muted">now</small>
            <Button 
              variant="link" 
              className="btn-close-custom"
              onClick={() => setShowFavoritesToast(false)}
            >
              <i className="bi bi-x"></i>
            </Button>
          </Toast.Header>
          <Toast.Body className="toast-body">
            Your favourites list is empty. Add some movies to your favourites!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Navbar>
  );
}
