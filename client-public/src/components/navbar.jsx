import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="d-flex flex-column navbar border-bottom border-body fixed-top"
      data-bs-theme="dark"
      style={{ height: 90, backgroundColor:"black" }}
    >
      <img
        src="https://st4.depositphotos.com/33942896/40632/v/450/depositphotos_406326112-stock-illustration-restaurant-simple-logo-design-vector.jpg"
        style={{ height: 70, marginLeft: 550 }}
      />
      <div className="container ">
        <Link to={"/"} className="navbar-brand mt-3">
          Indonesian Traditional Restaurant
        </Link>
        <div className="d-flex flex-row-reverse"></div>
      </div>
    </nav>
  );
}

export default Navbar;
