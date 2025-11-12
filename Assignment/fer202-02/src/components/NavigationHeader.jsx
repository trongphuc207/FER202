
import React from 'react';
import { Navbar, Nav, Button, Container, Image } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
const NavigationHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const fullName = user?.fullName || user?.username || 'Student';
    const logoSrc = '/images/logo.png';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <Navbar bg="secondary" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/home" className="d-flex align-items-center gap-2">
                    <Image
                        src={logoSrc}
                        alt="PersonalBudget logo"
                        height={36}
                        roundedCircle
                    />
                    <span>PersonalBudget</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Navbar.Text className="me-3">
                            Signed in as: <strong>{fullName}</strong>
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
