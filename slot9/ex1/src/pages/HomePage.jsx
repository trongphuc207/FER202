import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieCard from "../components/Movie/MovieCard";
import { movies } from "../data/movies";

export default function HomePage() {
  return (
    <Container className="mt-3">
      <HomeCarousel />

      <div className="mt-4">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">Thêm thông tin về các bộ sưu tập phim nổi bật ở đây.</p>
      </div>

      <Row xs={1} sm={2} lg={3} className="g-3 mt-2">
        {movies.map((m) => (
          <Col key={m.id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
