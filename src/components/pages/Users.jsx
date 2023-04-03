import React from "react";
import { useLoaderData } from "react-router-dom";
import User from "./User";

const Users = () => {
  const loaderData = useLoaderData();
  return (
    <div>
      {loaderData.map((el) => (
        <User key={el.id} data={el} />
      ))}
    </div>
  );
};

export default Users;
