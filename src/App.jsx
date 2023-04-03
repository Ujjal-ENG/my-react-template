import { Link, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <h1>Hello World</h1>

      <Outlet />
      <Link
        to="/"
        style={{
          margin: "0px 20px 0px 20px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Go Back
      </Link>
    </div>
  );
}

export default App;
