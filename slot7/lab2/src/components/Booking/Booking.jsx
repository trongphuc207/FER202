import "./Booking.css";

export default function Booking() {
  const onSubmit = (e) => e.preventDefault();

  return (
    <form className="p-3 p-md-4 rounded-3 booking-card" onSubmit={onSubmit}>
      <div className="row g-3">
        <div className="col-md-4">
          <input className="form-control" placeholder="Your Name *" required />
        </div>
        <div className="col-md-4">
          <input className="form-control" type="email" placeholder="Your Email *" required />
        </div>
        <div className="col-md-4">
          <select className="form-select" defaultValue="" required>
            <option value="" disabled>Select a Service</option>
            <option>Dine In</option>
            <option>Birthday Party</option>
            <option>Corporate</option>
          </select>
        </div>
        <div className="col-12">
          <textarea className="form-control" rows="6" placeholder="Please write your comment"></textarea>
        </div>
        <div className="col-12">
          <button className="btn btn-warning fw-semibold">Send Message</button>
        </div>
      </div>
    </form>
  );
}
