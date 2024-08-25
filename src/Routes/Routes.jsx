import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import RegisterHr from "../Pages/Register/RegisterHr/RegisterHr";
import Login from "../Pages/Login/Login";



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
      ]
    },
  ]);