import "./Menu.css";

function Badge({ tag }) {
  if (!tag) return null;
  return (
    <span className={`position-absolute top-0 start-0 m-2 badge ${tag === "SALE" ? "bg-warning text-dark" : "bg-success"}`}>
      {tag}
    </span>
  );
}

function Card({ title, price, oldPrice, tag, img }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm position-relative">
        <Badge tag={tag} />
        <img src={img} className="card-img-top menu-img" alt={title} />
        <div className="card-body">
          <h5 className="card-title mb-2">{title}</h5>
          <div className="d-flex align-items-center gap-2 mb-2">
            {oldPrice && <span className="text-muted text-decoration-line-through">${oldPrice.toFixed(2)}</span>}
            <span className="fw-bold">${price.toFixed(2)}</span>
          </div>
          <button className="btn btn-dark w-100">Buy</button>
        </div>
      </div>
    </div>
  );
}

export default function Menu({ items }) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 justify-content-center">
      {items.map(p => <Card key={p.id} {...p} />)}
    </div>
  );
}
