import logo from "../components/Assets/fpt.png"; 

export default function Header() {
  return (
    <header className="header">
      <div className="container d-flex justify-content-center">
        <div className="logo-wrap">
          <img className="logo" src={logo} alt="FPT University" />
        </div>
      </div>
    </header>
  );
}
