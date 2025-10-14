import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './MovieCard.css';

export default function MovieCard({img, title, text, genre, year, country, duration, showtimes}) {
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      setToastMessage(`${title} removed from favourites!`);
    } else {
      setIsFavorite(true);
      setToastMessage(`${title} added to favourites!`);
    }
    setShowToast(true);
  };
  return (
    <Card className="movie-card h-100 shadow-sm border-0">
      <div className="movie-poster-container">
        <Card.Img 
          variant="top" 
          src={img} 
          className="movie-poster"
          alt={title}
        />
        <div className="movie-overlay">
          <Badge bg="primary" className="genre-badge">{genre}</Badge>
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="movie-title mb-2">{title}</Card.Title>
        <Card.Text className="movie-description text-muted flex-grow-1">
          {text}
        </Card.Text>
        
        {/* Movie Info Badges */}
        <div className="movie-info-badges mb-3">
          <Badge bg="secondary" className="info-badge year-badge">
            <i className="bi bi-calendar3 me-1"></i>
            {year}
          </Badge>
          <Badge bg="dark" className="info-badge country-badge">
            <i className="bi bi-geo-alt me-1"></i>
            {country}
          </Badge>
          <Badge bg="warning" text="dark" className="info-badge duration-badge">
            <i className="bi bi-clock me-1"></i>
            {duration}′
          </Badge>
        </div>
        
        <div className="movie-actions mt-auto">
          <Button 
            variant="primary" 
            className="action-btn details-btn"
            size="sm"
            onClick={handleShowModal}
          >
            <i className="bi bi-info-circle me-1"></i>
            Details
          </Button>
          <Button 
            variant={isFavorite ? "warning" : "outline-warning"}
            className={`action-btn favourite-btn ${isFavorite ? 'favourite-active' : ''}`}
            size="sm"
            onClick={handleFavorite}
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i>
            {isFavorite ? 'Favourited' : 'Favourite'}
          </Button>
        </div>
      </Card.Body>

      {/* Movie Detail Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            <i className="bi bi-film me-2"></i>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="row">
            <div className="col-md-4">
              <img 
                src={img} 
                alt={title}
                className="modal-poster img-fluid rounded"
              />
            </div>
            <div className="col-md-8">
              <p className="modal-description">{text}</p>
              
              <div className="movie-details">
                <div className="detail-item">
                  <strong><i className="bi bi-calendar3 me-1"></i>Year:</strong> {year}
                </div>
                <div className="detail-item">
                  <strong><i className="bi bi-geo-alt me-1"></i>Country:</strong> {country}
                </div>
                <div className="detail-item">
                  <strong><i className="bi bi-clock me-1"></i>Duration:</strong> {duration} min
                </div>
                <div className="detail-item">
                  <strong><i className="bi bi-tag me-1"></i>Genre:</strong> {genre}
                </div>
              </div>

              {showtimes && showtimes.length > 0 && (
                <div className="showtimes-section mt-4">
                  <h6 className="showtimes-title">
                    <i className="bi bi-clock-history me-1"></i>
                    Showtimes
                  </h6>
                  <div className="showtimes-list">
                    {showtimes.map((time, index) => (
                      <Badge key={index} bg="success" className="showtime-badge">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            <i className="bi bi-x-circle me-1"></i>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          className="favorite-toast"
        >
          <Toast.Header closeButton={false}>
            <i className={`bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart text-muted'} me-2`}></i>
            <strong className="me-auto">Favourites</strong>
            <small className="text-muted">now</small>
            <Button 
              variant="link" 
              className="btn-close-custom"
              onClick={() => setShowToast(false)}
            >
              <i className="bi bi-x"></i>
            </Button>
          </Toast.Header>
          <Toast.Body className="toast-body">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Card>
  );
}