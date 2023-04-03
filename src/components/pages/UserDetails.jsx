import React from "react";
import { useLoaderData } from "react-router-dom";

const UserDetails = () => {
  const idData = useLoaderData();
  const { name, username, address, company } = idData;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "between",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <ul style={{ color: "white" }}>
        {Object.values(address).map((el, idx) => {
          if (typeof el !== "object") {
            return <li key={idx}>{el}</li>;
          }
        })}
      </ul>
      <ol style={{ color: "white" }}>
        {Object.values(company).map((el, idx) => {
          if (typeof el !== "object") {
            return <li key={idx}>{el}</li>;
          }
        })}
      </ol>
    </div>
  );
};

export default UserDetails;
