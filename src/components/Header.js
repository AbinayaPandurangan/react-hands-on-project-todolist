import React from "react";
import logo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.css";

function Header() {
  return (
    <div className="header  fixed-top">
      <div className="container">
        <div className="head  pull-left">
          <img src={logo} alt="to do list logo" />
          <h2 className="d-inline logo ">To Do List App</h2>
        </div>
      </div>
    </div>
  );
}
export default Header;
