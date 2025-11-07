// NavigationHeader.jsx là component thanh điều hướng chung chứa thông tin đăng nhập và nút Logout
import React from 'react';
import { Navbar, Nav, Button, Container, Image } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
const NavigationHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const fullName = user?.fullName || user?.username || 'Student';
    const avatar = user?.avatar || '/images/users/default.png';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/home">TuitionTracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/users" className="text-light">
                            User Management
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Navbar.Text className="me-3 d-flex align-items-center">
                            <Image 
                                src={avatar} 
                                roundedCircle 
                                width="30" 
                                height="30" 
                                className="me-2"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/images/users/default.png';
                                }}
                            />
                            Signed in as: <strong className="ms-2">{fullName}</strong>
                        </Navbar.Text>
                        <Button variant="outline-light" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default NavigationHeader;
