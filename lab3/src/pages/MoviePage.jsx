import MovieCard from '../components/Movie/MovieCard.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {movies} from '../data/movies.js';
import './HomePage.css';
  
export default function MoviePage() {
  return (
    <div className="home-page">
      <Container className="py-4">
        <div className="section-header text-center my-5">
          <h2 className="display-5 fw-bold text-primary mb-3">
            <i className="bi bi-collection me-3"></i>
            My Movies Collection
          </h2>
          <p className="lead text-muted">
            Browse through all available movies
          </p>
        </div>

        <div className="movies-grid mt-4">
          <Row xs={1} sm={2} lg={3} xl={4} className="g-4"> 
            {movies.map((movie) => (
              <Col key={movie.id}>
                <MovieCard 
                  img={movie.poster}
                  title={movie.title}
                  text={movie.description} 
                  genre={movie.genre}
                  year={movie.year}
                  country={movie.country}
                  duration={movie.duration}
                  showtimes={movie.showtimes}
                />
              </Col>
            ))}
          </Row>  
        </div>
      </Container>
    </div>
  );
}
