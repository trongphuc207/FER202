import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieCard from "../components/Movie/MovieCard";
import Filter from "../components/Filter/Filter";
import { movies } from "../data/movies";
import "./HomePage.css";

export default function HomePage() {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title-asc');

  
  const applyFilters = (search = searchTerm, year = yearFilter, sort = sortBy) => {
    let filtered = [...movies];

    
    if (search.trim()) {
      filtered = filtered.filter(movie => 
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply year filter
    if (year !== 'all') {
      if (year === '<=2000') {
        filtered = filtered.filter(movie => movie.year <= 2000);
      } else if (year === '2001-2015') {
        filtered = filtered.filter(movie => movie.year >= 2001 && movie.year <= 2015);
      } else if (year === '>2015') {
        filtered = filtered.filter(movie => movie.year > 2015);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'year-asc':
          return a.year - b.year;
        case 'year-desc':
          return b.year - a.year;
        case 'duration-asc':
          return a.duration - b.duration;
        case 'duration-desc':
          return b.duration - a.duration;
        default:
          return 0;
      }
    });

    setFilteredMovies(filtered);
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    applyFilters(searchValue, yearFilter, sortBy);
  };

  const handleFilter = (yearValue) => {
    setYearFilter(yearValue);
    applyFilters(searchTerm, yearValue, sortBy);
  };

  const handleSort = (sortValue) => {
    setSortBy(sortValue);
    applyFilters(searchTerm, yearFilter, sortValue);
  };

  return (
    <div className="home-page">
      <Container className="py-4">
        <HomeCarousel />

        <div className="section-header text-center my-5">
          <h2 className="display-5 fw-bold text-primary mb-3">
            <i className="bi bi-film me-3"></i>
            Featured Movies Collections
          </h2>
          <p className="lead text-muted">
            Discover amazing movies from our curated collection
          </p>
        </div>

        <Filter 
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          searchTerm={searchTerm}
          yearFilter={yearFilter}
          sortBy={sortBy}
        />

        <div className="movies-grid mt-4">
          <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
            {filteredMovies.map((m) => (
              <Col key={m.id}>
            <MovieCard 
              img={m.poster}
              title={m.title}
              text={m.description}
              genre={m.genre}
              year={m.year}
              country={m.country}
              duration={m.duration}
              showtimes={m.showtimes}
            />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}
