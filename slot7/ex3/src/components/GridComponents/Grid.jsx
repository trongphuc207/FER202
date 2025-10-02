import "./Grid.css";
export default function GridDemo() {
  return (
    <div className="container my-4">
      
      <div className="row gx-2 gy-2">
        <div className="col-12 col-md-6">
          <div className="tile">First col</div>
        </div>
        <div className="col-12 col-md-6">
          <div className="tile">Second col</div>
        </div>
      </div>

      
      <div className="row gx-2 gy-2 mt-2">
        <div className="col-12 col-md-3">
          <div className="tile">col</div>
        </div>
        <div className="col-12 col-md-6">
          <div className="tile">col</div>
        </div>
        <div className="col-12 col-md-3">
          <div className="tile">col</div>
        </div>
      </div>

      <div className="row gx-2 gy-2 mt-2">
        <div className="col-12 col-md-4">
          <div className="tile">col</div>
        </div>
        <div className="col-12 col-md-4">
          <div className="tile">col</div>
        </div>
        <div className="col-12 col-md-4">
          <div className="tile">col</div>
        </div>
      </div>
    </div>
  );
}
