export default function StudentCard({data, value, onChange, onSubmit}) {
  const {id, name, city, photo} = data;
  return (
    <div className="card shadow-sm h-100">
      <img src={photo} className="card-img-top" alt={name} style={{objectFit:"cover", height:260}}/>
      <div className="card-body">
        <div className="d-flex justify-content-between text-muted small mb-2">
          <span>{id}</span><span>{city}</span>
        </div>
        <div className="mb-2">{name}</div>

        <div className="d-flex justify-content-between small">
          <label className="form-check">
            <input className="form-check-input" type="radio"
              checked={value==="absent"} onChange={()=>onChange(id,"absent")} />
            <span className="form-check-label">Absent</span>
          </label>

          <label className="form-check">
            <input className="form-check-input" type="radio"
              checked={value==="present"} onChange={()=>onChange(id,"present")} />
            <span className="form-check-label">Present</span>
          </label>
        </div>

        <div className="mt-3">
          <button className="btn btn-warning btn-sm" onClick={()=>onSubmit(id)}>Submit</button>
        </div>
      </div>
    </div>
  );
}
