import logo from "../components/assets/fpt.png"; // thay đường dẫn theo ảnh của bạn

export default function Topbar() {
  return (
    <div className="py-2" style={{background:"#e6c2a0"}}>
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <img src={logo} alt="FPT" style={{height:28}}/>
          <nav className="small d-none d-md-flex gap-3">
            <a href="/" className="text-decoration-none text-dark">Trang chủ</a>
            <a href="/" className="text-decoration-none text-dark">Ngành học</a>
            <a href="/" className="text-decoration-none text-dark">Tuyển sinh</a>
            <a href="/" className="text-decoration-none text-dark">Sinh viên</a>
          </nav>
        </div>
        <form className="d-flex align-items-center gap-2">
          <label className="small">Search:</label>
          <input className="form-control form-control-sm" style={{width:180}}/>
        </form>
      </div>
      <div style={{background:"#e79033", height:38}} className="w-100"/>
    </div>
  );
}
