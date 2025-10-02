import "./Navbar.css";

export default function Navbar({ query, setQuery }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        
        <a className="navbar-brand fw-bold" href="#">Pizza House</a>

        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

       
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
          </ul>

          
          <form className="d-flex search-box" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-danger search-btn" type="submit">
              <i className="bi bi-search text-white"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
