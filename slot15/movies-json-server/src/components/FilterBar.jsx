// src/components/FilterBar.jsx
import React, { useReducer, useEffect } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';


const ACTION_TYPES = {
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    SET_SELECTED_GENRE: 'SET_SELECTED_GENRE',
    SET_DURATION_FILTER: 'SET_DURATION_FILTER',
    SET_SORT_ORDER: 'SET_SORT_ORDER',
    RESET_FILTERS: 'RESET_FILTERS'
};

const initialState = {
    searchTerm: '',
    selectedGenre: '',
    durationFilter: '',
    sortOrder: ''
};

const filterReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_SEARCH_TERM:
            return { ...state, searchTerm: action.payload };
        case ACTION_TYPES.SET_SELECTED_GENRE:
            return { ...state, selectedGenre: action.payload };
        case ACTION_TYPES.SET_DURATION_FILTER:
            return { ...state, durationFilter: action.payload };
        case ACTION_TYPES.SET_SORT_ORDER:
            return { ...state, sortOrder: action.payload };
        case ACTION_TYPES.RESET_FILTERS:
            return initialState;
        default:
            return state;
    }
};

const FilterBar = () => {
    const state = useMovieState();
    const { genres, movies } = state;
    
    const [filterState, filterDispatch] = useReducer(filterReducer, initialState);
    const { searchTerm, selectedGenre, durationFilter, sortOrder } = filterState;

    const dispatch = useMovieDispatch().dispatch;

    const handleSearchChange = (e) => {
        filterDispatch({ type: ACTION_TYPES.SET_SEARCH_TERM, payload: e.target.value });
    };

    const handleGenreChange = (e) => {
        filterDispatch({ type: ACTION_TYPES.SET_SELECTED_GENRE, payload: e.target.value });
    };

    const handleDurationChange = (e) => {
        filterDispatch({ type: ACTION_TYPES.SET_DURATION_FILTER, payload: e.target.value });
    };

    const handleSortChange = (e) => {
        filterDispatch({ type: ACTION_TYPES.SET_SORT_ORDER, payload: e.target.value });
    };

    const handleClearFilters = () => {
        filterDispatch({ type: ACTION_TYPES.RESET_FILTERS });
    };

    // Apply filters whenever filter criteria change
    useEffect(() => {
        let filteredMovies = [...movies];

        // Search filter (by title)
        if (searchTerm) {
            filteredMovies = filteredMovies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Genre filter
        if (selectedGenre) {
            filteredMovies = filteredMovies.filter(movie =>
                movie.genreId === parseInt(selectedGenre)
            );
        }

        if (durationFilter) {
            switch (durationFilter) {
                case 'short': 
                    filteredMovies = filteredMovies.filter(movie => movie.duration < 90);
                    break;
                case 'medium': 
                    filteredMovies = filteredMovies.filter(movie => 
                        movie.duration >= 90 && movie.duration <= 120
                    );
                    break;
                case 'long': 
                    filteredMovies = filteredMovies.filter(movie => movie.duration > 120);
                    break;
                default:
                    break;
            }
        }

  
        if (sortOrder) {
            filteredMovies.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.title.localeCompare(b.title);
                } else if (sortOrder === 'desc') {
                    return b.title.localeCompare(a.title);
                }
                return 0;
            });
        }

        // Dispatch filtered movies
        dispatch({ type: 'SET_FILTERED_MOVIES', payload: filteredMovies });
    }, [searchTerm, selectedGenre, durationFilter, sortOrder, movies, dispatch]);

    return (
        <div className="p-3 mb-4 bg-light rounded border">
            <h5 className="mb-3">🔍 Tìm kiếm và Lọc</h5>
            
            <Row className="g-3">
                {/* Search by title */}
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Tìm kiếm theo tên phim</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-search"></i> 🔎
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên phim..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>

                {/* Filter by genre */}
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Lọc theo thể loại</Form.Label>
                        <Form.Select
                            value={selectedGenre}
                            onChange={handleGenreChange}
                        >
                            <option value="">Tất cả thể loại</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>

                {/* Filter by duration */}
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Lọc theo thời lượng</Form.Label>
                        <Form.Select
                            value={durationFilter}
                            onChange={handleDurationChange}
                        >
                            <option value="">Tất cả thời lượng</option>
                            <option value="short">Ngắn (&lt; 90 phút)</option>
                            <option value="medium">Trung bình (90-120 phút)</option>
                            <option value="long">Dài (&gt; 120 phút)</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                {/* Sort by name */}
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Sắp xếp theo tên</Form.Label>
                        <Form.Select
                            value={sortOrder}
                            onChange={handleSortChange}
                        >
                            <option value="">Không sắp xếp</option>
                            <option value="asc">Tên A-Z (Tăng dần)</option>
                            <option value="desc">Tên Z-A (Giảm dần)</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={handleClearFilters}
                    >
                        🔄 Xóa bộ lọc
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default FilterBar;


