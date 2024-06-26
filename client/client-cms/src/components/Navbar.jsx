import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }
  return (
    <nav
      className="fixed-top navbar navbar-expand-lg"
      style={{ marginLeft: 200, height: 68, backgroundColor:"white" }}
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
              style={{ height: 50 }}
              src="https://logowik.com/content/uploads/images/restaurant9491.logowik.com.webp"
              alt="logo"
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
