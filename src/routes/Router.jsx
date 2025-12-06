import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs";
import EmployeeRegister from "../pages/auth/EmployeeRegister";
import Login from "../pages/auth/Login";
import HRRegister from "../pages/auth/HRRegister";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/hrRegister",
        Component: HRRegister,
      },
      {
        path: "/employeeRegister",
        Component: EmployeeRegister,
      },
    ],
  },
]);
