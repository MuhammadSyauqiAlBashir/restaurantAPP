import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="d-flex">
         <SideBar />
         <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
