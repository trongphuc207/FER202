// src/components/MovieTable.jsx
import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  // Lấy confirmDelete từ Context (chứa logic xóa phim)
  const { dispatch, confirmDelete } = useMovieDispatch(); 
  
  const { filteredMovies, genres, loading, movieToDelete, showDeleteModal, movieToView, showDetailModal } = state;
  
  // Use filteredMovies if available, otherwise use all movies
  const movies = filteredMovies.length > 0 || state.movies.length === 0 ? filteredMovies : state.movies;

  // Tạo genre map từ dữ liệu API
  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  // Hàm để lấy màu badge theo danh mục
  const getCategoryBadgeVariant = (genreName) => {
    const categoryColors = {
      'Sci-Fi': 'primary',
      'Comedy': 'warning',
      'Drama': 'info', 
      'Horror': 'dark',
      'Romance': 'danger',
      'Action': 'success',
      'Thriller': 'secondary'
    };
    return categoryColors[genreName] || 'secondary';
  };

  const handleEditClick = (movie) => {
      // Mở Modal Sửa và gán dữ liệu vào state
      dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };
  
  const handleDeleteClick = (movie) => {
      // Mở Modal Xác nhận Xóa và gán phim vào movieToDelete
      dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  const handleViewDetailClick = (movie) => {
      // Mở Modal chi tiết phim
      dispatch({ type: 'OPEN_DETAIL_MODAL', payload: movie });
  };

  return (
    <>
      {loading && movies.length === 0 ? (
          <div className="text-center my-4">
              <Spinner animation="border" role="status" variant="primary" className="me-2" />
              <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
          </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Danh mục</th>
              <th>Thời lượng (phút)</th>
  
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td><Image src={movie.avatar} alt={movie.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} rounded /></td>
                  <td>#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <br />
                    <small className="text-muted">({movie.year})</small>
                  </td>
                  <td>
                    
                      {genreName}
                    
                  </td>
                  <td>{movie.duration} phút</td>
                 
                  <td>
                    <Button variant="info" size="sm" className="me-2" onClick={() => handleViewDetailClick(movie)}>View Detail</Button>
                    <Button variant="primary" size="sm" onClick={() => handleEditClick(movie)} className="me-2">Sửa</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)}>Xóa</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* MODAL XEM CHI TIẾT PHIM */}
      <Modal show={showDetailModal} onHide={() => dispatch({ type: 'CLOSE_DETAIL_MODAL' })} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>🎬 Chi Tiết Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {movieToView && (
            <div>
              <div className="text-center mb-3">
                <Image 
                  src={movieToView.avatar} 
                  alt={movieToView.title} 
                  style={{ width: '200px', height: '300px', objectFit: 'cover' }} 
                  rounded 
                  className="mb-3"
                />
              </div>
              <div className="mb-3">
                <h4 className="mb-2">{movieToView.title}</h4>
                <p className="text-muted mb-2">({movieToView.year})</p>
              </div>
              <div className="mb-3">
                <strong>Mô tả:</strong>
                <p className="mt-2">{movieToView.description}</p>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-2">
                  <strong>ID:</strong> #{movieToView.id}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Danh mục:</strong> {genreMap[movieToView.genreId] || 'Unknown'}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Thời lượng:</strong> {movieToView.duration} phút
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Năm phát hành:</strong> {movieToView.year}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Quốc gia:</strong> {movieToView.country}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DETAIL_MODAL' })}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL XÁC NHẬN XÓA */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim **"{movieToDelete?.title}"** (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
