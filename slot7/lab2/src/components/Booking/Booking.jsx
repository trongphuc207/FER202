import "./Booking.css";

export default function Booking() {
  const onSubmit = (e) => e.preventDefault();

  return (
    <form className="p-4 rounded-3 booking-card" onSubmit={onSubmit}>
      <div className="row g-4">
        <div className="col-md-4">
          <input className="form-control form-control-lg" placeholder="Your Name *" required />
        </div>
        <div className="col-md-4">
          <input className="form-control form-control-lg" type="email" placeholder="Your Email *" required />
        </div>
        <div className="col-md-4">
          <select className="form-select form-select-lg" defaultValue="" required>
            <option value="" disabled>Select a Service</option>
            <option>Dine In</option>
            <option>Birthday Party</option>
            <option>Corporate</option>
          </select>
        </div>
        <div className="col-12">
          <textarea className="form-control form-control-lg" rows="5" placeholder="Please write your comment"></textarea>
        </div>
        <div className="col-12 text-center">
          <button className="btn btn-warning btn-lg fw-semibold px-5">Send Message</button>
        </div>
      </div>
    </form>
  );
}
