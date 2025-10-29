import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Filter.css';

export default function Filter({ onSearch, onFilter, onSort, searchTerm, yearFilter, sortBy }) {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    onSearch(searchValue);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    onFilter(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    onSort(value);
  };

  return (
    <Card className="filter-card mb-5 shadow-sm border-0">
      <Card.Header className="filter-header">
        <h5 className="mb-0">
          <i className="bi bi-funnel me-2"></i>
          Filter & Search Movies
        </h5>
      </Card.Header>
      <Card.Body className="filter-body">
        <Row>
          {/* Search */}
          <Col md={4}>
            <Form onSubmit={handleSearch}>
              <Form.Group className="mb-3">
                <Form.Label className="filter-label">
                  <i className="bi bi-search me-1"></i>
                  Search Movies
                </Form.Label>
                <Form.Control
                  name="search"
                  type="text"
                  placeholder="Search by title or description..."
                  defaultValue={searchTerm}
                  className="filter-input"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="filter-btn">
                <i className="bi bi-search me-1"></i>
                Search
              </Button>
            </Form>
          </Col>

          {/* Filter by Year */}
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="filter-label">
                <i className="bi bi-calendar me-1"></i>
                Filter by Year
              </Form.Label>
              <Form.Select 
                value={yearFilter} 
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="all">All Years</option>
                <option value="<=2000">≤ 2000</option>
                <option value="2001-2015">2001-2015</option>
                <option value=">2015"> 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Sort */}
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="filter-label">
                <i className="bi bi-sort-down me-1"></i>
                Sort by
              </Form.Label>
              <Form.Select 
                value={sortBy} 
                onChange={handleSortChange}
                className="filter-select"
              >
                <option value="title-asc">Title A→Z</option>
                <option value="title-desc">Title Z→A</option>
                <option value="year-asc">Year ↑</option>
                <option value="year-desc">Year ↓</option>
                <option value="duration-asc">Duration ↑</option>
                <option value="duration-desc">Duration ↓</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
