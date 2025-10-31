// src/reducers/movieReducers.jsx
export const initialMovieState = {
  movies: [],
  filteredMovies: [], // Add filtered movies state
  genres: [],
  loading: false, 
  isEditing: null, 
  currentMovie: { avatar: '', title: '', description: '', genreId: '', duration: '', year: '', country: '' },
  showEditModal: false,   
  showDeleteModal: false, 
  movieToDelete: null,
  showDetailModal: false,
  movieToView: null     
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload, filteredMovies: action.payload, loading: false };

    case 'SET_FILTERED_MOVIES':
      return { ...state, filteredMovies: action.payload };

    case 'SET_GENRES':
      return { ...state, genres: action.payload };
      
    case 'START_LOADING':
      return { ...state, loading: true };
      
    case 'UPDATE_FIELD':
      return { 
          ...state, 
          currentMovie: { ...state.currentMovie, [action.payload.name]: action.payload.value }
      };

    case 'OPEN_EDIT_MODAL':
      // Gán dữ liệu phim vào currentMovie để điền vào form sửa
      return { 
        ...state, 
        currentMovie: action.payload, 
        isEditing: action.payload.id,
        showEditModal: true 
      };
      
    case 'CLOSE_EDIT_MODAL':
      return { 
        ...state, 
        currentMovie: initialMovieState.currentMovie,
        isEditing: null,
        showEditModal: false 
      };

    case 'OPEN_DELETE_MODAL':
        return {
            ...state,
            movieToDelete: action.payload,
            showDeleteModal: true 
        };

    case 'CLOSE_DELETE_MODAL':
        return {
            ...state,
            movieToDelete: null,
            showDeleteModal: false 
        };

    case 'OPEN_DETAIL_MODAL':
        return {
            ...state,
            movieToView: action.payload,
            showDetailModal: true 
        };

    case 'CLOSE_DETAIL_MODAL':
        return {
            ...state,
            movieToView: null,
            showDetailModal: false 
        };
      
    case 'RESET_FORM':
      return { 
        ...state, 
        currentMovie: initialMovieState.currentMovie, 
        isEditing: null,
        showEditModal: false,
      };

    default:
      return state;
  }
};
