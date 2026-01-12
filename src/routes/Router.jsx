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
import AssetList from "../pages/dashboard/hr/AssetList";
import EmployeeRoute from "./EmployeeRoute";
import RequestAsset from "../pages/dashboard/employee/RequestAsset";
import AllRequests from "../pages/dashboard/hr/AllRequests";
import MyEmployees from "../pages/dashboard/hr/MyEmployees";
import MyAssets from "../pages/dashboard/employee/MyAssets";
import MyTeam from "../pages/dashboard/employee/MyTeam";
import MyProfile from "../pages/dashboard/employee/MyProfile";
import UpgradePackage from "../pages/dashboard/hr/UpgradePackage";
import PaymentSuccess from "../pages/dashboard/payment/PaymentSuccess";
import PaymentCancelled from "../pages/dashboard/payment/PaymentCancelled";
import PaymentHistory from "../pages/dashboard/payment/PaymentHistory";
import HRDashboardHome from "../pages/dashboard/hr/hrDashboardHome";
import ContactUs from "../pages/Home/ContactUs";


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
        path: "/contact",
        Component: ContactUs,
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
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // HR only routes
       {
        path: "homepage",
        element: (
          <HRRoute>
            <HRDashboardHome></HRDashboardHome>
          </HRRoute>
        ),
      },
      {
        path: "addAsset",
        element: (
          <HRRoute>
            <AddAsset></AddAsset>
          </HRRoute>
        ),
      },

      {
        path: "assetList",
        element: (
          <HRRoute>
            <AssetList></AssetList>
          </HRRoute>
        ),
      },
      {
        path: "allRequests",
        element: (
          <HRRoute>
            <AllRequests></AllRequests>
          </HRRoute>
        ),
      },
      {
        path: "myEmployees",
        element: (
          <HRRoute>
            <MyEmployees></MyEmployees>
          </HRRoute>
        ),
      },
      {
        path: "upgradePackage",
        element: (
          <HRRoute>
            <UpgradePackage></UpgradePackage>
          </HRRoute>
        ),
      },
      {
        path: "paymentSuccess",
        Component: PaymentSuccess,
      },
      {
        path: "paymentCancelled",
        Component: PaymentCancelled,
      },
      {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
          
      },

      // employee only routes
      {
        path: "requestAsset",
        element: (
          <EmployeeRoute>
            <RequestAsset></RequestAsset>
          </EmployeeRoute>
        ),
      },
      {
        path: "myAssets",
        element: (
          <EmployeeRoute>
            <MyAssets></MyAssets>
          </EmployeeRoute>
        ),
      },
      {
        path: "myTeam",
        element: (
          <EmployeeRoute>
            <MyTeam></MyTeam>
          </EmployeeRoute>
        ),
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },
    ],
  },
]);
