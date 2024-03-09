import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="d-flex flex-column navbar bg-dark border-bottom border-body fixed-top"
      data-bs-theme="dark"
      style={{ height: 90 }}
    >
      <img
        src="https://res-console.cloudinary.com/dep5hbgsn/media_explorer_thumbnails/ce5950f444e734ab627c9a94560a7e2b/detailed"
        style={{ height: 70, marginLeft:550}}
      />
      <div className="container ">
        <Link to={"/"} className="navbar-brand mt-3">
          Indonesian Traditional Restaurant
        </Link>
        <div className="d-flex flex-row-reverse">
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
