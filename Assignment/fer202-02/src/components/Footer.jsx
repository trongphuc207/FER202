import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#f8f9fa',
        padding: '20px 0',
        marginTop: 'auto',
      }}
    >
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-muted small">
        <div className="text-center text-md-start">© 2025 PersonalBudget Demo</div>
        <div className="text-center text-md-end">Built with React, Redux Toolkit & JSON Server</div>
      </Container>
    </footer>
  );
};

export default Footer;

