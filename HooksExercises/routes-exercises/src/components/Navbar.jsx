import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>{" | "}
      <NavLink
        to="/san-pham"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Products
      </NavLink>{" | "}
      <NavLink
        to="/lien-he"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Contact
      </NavLink>
    </nav>
  );
}
