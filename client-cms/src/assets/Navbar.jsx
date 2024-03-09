import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }
  return (
    <nav
      className="fixed-top navbar navbar-expand-lg bg-secondary-subtle"
      style={{ marginLeft: 200, height: 68 }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="https://restaurantindonesiahck.watersnj.com/"
        >
          View Public Site
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="d-flex justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
            <img
              style={{ width: 70 }}
              src="https://res-console.cloudinary.com/dep5hbgsn/media_explorer_thumbnails/ce5950f444e734ab627c9a94560a7e2b/detailed"
            />
          </ul>
        </div>
        <div className="d-flex mt-5 justify-content-center top-50 start-100 translate-middle">
          <button
            className="btn btn-secondary"
            onClick={handleLogout}
            style={{ height: 50}}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
