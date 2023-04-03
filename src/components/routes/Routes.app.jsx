import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Users from "../pages/Users";
import UserDetails from "../pages/UserDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "users",
        element: <Users />,
        loader: async () => fetch("https://jsonplaceholder.typicode.com/users"),
      },
      {
        path: "user-details/:id",
        element: <UserDetails />,
        loader: async ({ params }) =>
          fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`),
      },
    ],
  },
]);
