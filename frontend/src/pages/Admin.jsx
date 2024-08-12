import React from "react";
import "../styles/admin.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
const Admin = () => {
  const navigate = useNavigate();
  // const addDeveloper = () => {
  // 	navigate("/admin/add-dev");
  // };
  // const redirectToHome = () => {
  // 	navigate("/");
  // };

  const user = localStorage.getItem("userRole");
//   console.log("userrrr", user);

  if (user !== "admin") {
    navigate("/");
  }

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };
  return (
    // <div className="admin">
    // 	<nav>
    // 		<p>Admin Pannel</p>
    // 		<p>IntelliaTech</p>
    // 	</nav>
    // 	<div className="main">
    // 		<div className="left">
    // 			<button onClick={addDeveloper}>Add Developer</button>
    // 			<button onClick={redirectToHome}>Home</button>
    // 			<button>Other</button>
    // 		</div>

    // 		<div className="right">
    // 			<Outlet />
    // 		</div>
    // 	</div>
    // </div>

    <div className="admin">
      <nav>
        <h3>IntelliaTech</h3>
        <button onClick={logoutHandler}>Logout</button>
      </nav>
      <div className="main-div">
        <div className="left">
          <Link to={"/"}>Home</Link>
          <Link to={"/admin"}>Add Dev</Link>
          <Link to={"/admin/change-status"}>Change Status</Link>
        </div>
        <div className="right">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
