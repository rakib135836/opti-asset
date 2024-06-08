import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Layout/Root';
import Home from './Pages/Home/Home';
import JoinAsEmployee from './Pages/JoinAsEmployee/JoinAsEmployee';
import JoinAsHR from './Pages/JoinAsHR/JoinAsHR';
import AuthProvider from './providers/AuthProvider';

import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'
import Login from './Pages/Login/Login';
import DashboardLayout from './Layout/DashboardLayout';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      }
    
    ]
  },
  {
    path:"/employee",
    element:<JoinAsEmployee></JoinAsEmployee>,
   },
   {
    path:"/hr-manager",
    element:<JoinAsHR></JoinAsHR>,
   },
   {
    path:"/login",
    element:<Login></Login>,
   },
   {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      
    
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-7xl mx-auto font-Poppins '>
    <React.StrictMode>

      <AuthProvider>
      <QueryClientProvider client={queryClient}>
     
     <RouterProvider router={router} />
     
     </QueryClientProvider>
     </AuthProvider>
     
    </React.StrictMode>,
  </div>
)
// ------------