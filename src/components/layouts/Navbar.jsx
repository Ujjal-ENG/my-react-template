import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <ul
        style={{
          backgroundColor: "rebeccapurple",
          padding: "10px",
          margin: "20px",
          borderRadius: "10px",
        }}
      >
        <NavLink
          className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? console.log("pending") : ""
          }
        ></NavLink>
        <NavLink
          to="/about"
          style={{
            margin: "0px 20px 0px 20px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          About
        </NavLink>
        <NavLink
          to="/contact-us"
          style={{
            margin: "0px 20px 0px 20px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/users"
          style={{
            margin: "0px 20px 0px 20px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Users
        </NavLink>
      </ul>
    </>
  );
};

export default Navbar;
