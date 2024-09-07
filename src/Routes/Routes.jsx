import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import RegisterHr from "../Pages/Register/RegisterHr/RegisterHr";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import EmployeeHome from "../Pages/Dashboard/Employee/EmployeeHome";
import MyAsset from "../Pages/Dashboard/Employee/MyAsset";
import RequestForAnAsset from "../Pages/Dashboard/Employee/RequestForAnAsset";
import MyTeam from "../Pages/Dashboard/Employee/MyTeam";
import EmployeeProfile from "../Pages/Dashboard/Employee/EmployeeProfile";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import AssetList from "../Pages/Dashboard/Admin/AssetList";
import AddAnAsset from "../Pages/Dashboard/Admin/AddAnAsset";
import AllRequests from "../Pages/Dashboard/Admin/AllRequests";
import CoustomRequestList from "../Pages/Dashboard/Admin/CoustomRequestList";
import MyEmployeeList from "../Pages/Dashboard/Admin/MyEmployeeList";
import AddAnEmployee from "../Pages/Dashboard/Admin/AddAnEmployee";
import Profile from "../Pages/Dashboard/Admin/Profile";
import PrivateRoute from "./PrivateRoute";
import UpdateAsset from "../Pages/Dashboard/Admin/UpdateAsset";
import HrRoute from "./HrRoute";
import Payment from "../Components/Payment";
import PaidRoute from "./PaidRoute";
import RequestedAsset from "../Pages/Dashboard/Employee/RequestedAsset";



 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>,

        },
        {
          path:'/register',
          element:<Register></Register>
        },
        {
          path:'/register-hr',
          element:<RegisterHr></RegisterHr>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/payment/:id',
          element:<Payment></Payment>,
          loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}subscriptions/${params.id}`)
        },

      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
     
      children:[

        // normal employee routes
        {
          path: 'userHome',
          element:<EmployeeHome></EmployeeHome>
        },
        {
          path: 'myAsset',
          element: <MyAsset></MyAsset>
        },
        {
          path: 'requestedAsset',
          element: <RequestedAsset></RequestedAsset>
        },
        {
          path: 'assetRequest',
          element: <RequestForAnAsset></RequestForAnAsset>
        },
        {
          path: 'myTeam',
          element: <MyTeam></MyTeam>
        },
        {
          path: 'employeeProfile',
          element: <EmployeeProfile></EmployeeProfile>
        },

        // admin only routes
       
        {
          path: 'adminHome',
          element: <HrRoute><AdminHome></AdminHome></HrRoute>
        },
        {
          path: 'assetList',
          element: <HrRoute><AssetList></AssetList></HrRoute>
        },
        {
          path: 'updateAsset/:id',
          element: <HrRoute><UpdateAsset></UpdateAsset></HrRoute>,
          loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}assets/${params.id}`)
        },
        {
          path: 'addAsset',
          element: <HrRoute><AddAnAsset></AddAnAsset></HrRoute>
        },
        {
          path: 'allRequests',
          element: <HrRoute><AllRequests></AllRequests></HrRoute>
        },
        {
          path: 'coustomRequests',
          element:<CoustomRequestList></CoustomRequestList>
        },
        {
          path: 'employeeList',
          element: <HrRoute><MyEmployeeList></MyEmployeeList></HrRoute>
        },
        {
          path: 'addEmployee',
          element: <PaidRoute><AddAnEmployee></AddAnEmployee></PaidRoute>
        },
        {
          path: 'adminProfile',
          element: <HrRoute><Profile></Profile></HrRoute>
        },
      ]
    }
  ]);