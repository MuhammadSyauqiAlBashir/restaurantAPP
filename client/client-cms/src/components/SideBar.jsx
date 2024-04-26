import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div
      className="fixed-top d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: 200, height:"100vh"}}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg className="bi me-2" width={40} height={32}>
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">Restaurant</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to={"/"} className="nav-link text-white" aria-current="page">
            <svg className="bi me-2" width={16} height={16}>
              <use xlinkHref="#home" />
            </svg>
            Home
          </Link>
        </li>
        <li>
          <Link to={"/categories"} className="nav-link text-white">
            <svg className="bi me-2" width={16} height={16}>
              <use xlinkHref="#speedometer2" />
            </svg>
            Categories
          </Link>
        </li>
        <li>
          <Link to={'/addstaff'} className="nav-link text-white">
            <svg className="bi me-2" width={16} height={16}>
              <use xlinkHref="#table" />
            </svg>
            Add Staff
          </Link>
        </li>
      </ul>
      <hr />

    </div>
  );
}

export default SideBar