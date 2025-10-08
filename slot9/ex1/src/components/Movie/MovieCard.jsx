import { useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";

const FAV_KEY = "favourites";

function useFavourites() {
  const get = () => {
    try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); }
    catch { return []; }
  };
  const set = (arr) => localStorage.setItem(FAV_KEY, JSON.stringify(arr));
  const add = (movie) => {
    const cur = get();
    if (!cur.some((x) => x.id === movie.id)) {
      cur.push({ id: movie.id, title: movie.title });
      set(cur);
      return true;
    }
    return false;
  };
  return { add, get };
}

const truncate = (s = "", n = 140) => (s.length <= n ? s : s.slice(0, n - 3) + "...");

export default function MovieCard({ movie }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [open, setOpen] = useState(false);
  const { add } = useFavourites();

  const facts = useMemo(() => ([
    `Year: ${movie.year}`,
    `Country: ${movie.country}`,
    `Duration: ${movie.duration} min`,
    `Genre: ${movie.genre}`,
  ]), [movie]);

  const onAddFav = () => {
    const ok = add(movie);
    setToastMsg(ok ? "Added to favourites!" : "Already in favourites!");
    setShowToast(true);
  };

  return (
    <>
      <Card className="h-100 shadow-sm border-0 movie-card">
        <Card.Img
          variant="top"
          src={movie.poster}
          alt={movie.title}
          style={{ height: 280, objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="mb-1">
            {movie.title} <Badge bg="info" className="text-dark">{movie.genre}</Badge>
          </Card.Title>
          <Card.Text className="text-secondary" style={{ flex: 1 }}>
            {truncate(movie.description)}
          </Card.Text>

          <div className="d-flex flex-wrap gap-2 mb-2">
            <Badge bg="secondary">{movie.year}</Badge>
            <Badge bg="dark">{movie.country}</Badge>
            <Badge bg="warning" text="dark">{movie.duration}′</Badge>
          </div>

          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={onAddFav}>Add to Favourites</Button>
            <Button variant="primary" onClick={() => setOpen(true)}>View Details</Button>
          </div>
        </Card.Body>
      </Card>

      {/* Toast góc phải trên */}
      <div className="position-fixed" style={{ top: 16, right: 16, zIndex: 1080 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={1400} autohide>
          <Toast.Header>
            <strong className="me-auto">Movies</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
      </div>

      {/* Modal chi tiết */}
      <Modal show={open} onHide={() => setOpen(false)} centered>
        <Modal.Header closeButton><Modal.Title>{movie.title}</Modal.Title></Modal.Header>
        <Modal.Body>
          <p className="mb-2">{movie.description}</p>
          <ul className="mb-2">{facts.map((f) => <li key={f}>{f}</li>)}</ul>
          {Array.isArray(movie.showtimes) && movie.showtimes.length > 0 && (
            <>
              <h6 className="mt-3">Showtimes</h6>
              <div className="d-flex flex-wrap gap-2">
                {movie.showtimes.map((t) => <Badge key={t} bg="success">{t}</Badge>)}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
