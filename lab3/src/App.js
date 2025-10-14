
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import AccountPage from './pages/AccountPage';
import FooterPage from './pages/FooterPage';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
        <FooterPage />
      </div>
    </Router>
  );
}

export default App;
