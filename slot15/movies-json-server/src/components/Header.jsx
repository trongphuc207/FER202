// src/components/Header.jsx
import React from 'react';
import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="#home">
                    🎬 Quản Lý Phim
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {user && (
                            <>
                                <Nav.Item className="me-3">
                                    <span className="text-light">
                                        Xin chào, <strong>{user.fullName}</strong>
                                        {isAdmin() && (
                                            <Badge bg="warning" text="dark" className="ms-2">
                                                Admin
                                            </Badge>
                                        )}
                                    </span>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button 
                                        variant="outline-light" 
                                        size="sm"
                                        onClick={handleLogout}
                                    >
                                        Đăng Xuất
                                    </Button>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;


