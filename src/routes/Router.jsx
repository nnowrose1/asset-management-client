import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs";
import EmployeeRegister from "../pages/auth/EmployeeRegister";
import Login from "../pages/auth/Login";
import HRRegister from "../pages/auth/HRRegister";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import AddAsset from "../pages/dashboard/hr/AddAsset";
import PrivateRoute from "./PrivateRoute";
import HRRoute from "./HRRoute";
import MyProfile from "../pages/dashboard/MyProfile";
import AssetList from "../pages/dashboard/hr/AssetList";
import EmployeeRoute from './EmployeeRoute';
import RequestAsset from "../pages/dashboard/employee/RequestAsset";
import AllRequests from "../pages/dashboard/hr/AllRequests";
import MyEmployees from "../pages/dashboard/hr/MyEmployees";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
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
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
      </PrivateRoute> ,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // HR only routes
      {
        path: 'addAsset',
        element: <HRRoute>
        <AddAsset></AddAsset>
        </HRRoute>
      },
      {
        path:'profile',
        Component: MyProfile

      },
      {
        path: 'assetList',
        element: <HRRoute>
        <AssetList></AssetList>
        </HRRoute>
      },
      {
     path: 'allRequests',
     element: <HRRoute>
     <AllRequests></AllRequests>
     </HRRoute>
      },
      {
      path: 'myEmployees',
      element: <HRRoute>
      <MyEmployees></MyEmployees>
      </HRRoute>
      },
      // employee only routes
      {
        path: 'requestAsset',
        element: <EmployeeRoute>
         <RequestAsset></RequestAsset>
        </EmployeeRoute>
      }
    ]
  }
]);
