import React from "react";
import { Link } from "react-router-dom";

const User = (props) => {
  const { name, email, id } = props.data;

  return (
    <Link
      style={{
        border: "2px solid red",
        padding: "5px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        margin: "10px",
        color: "white",
      }}
      to={`/user-details/${id}`}
    >
      <h1>{name}</h1>
      <h4>{email}</h4>
    </Link>
  );
};

export default User;
