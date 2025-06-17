import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import Error from "../Components/Error";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
