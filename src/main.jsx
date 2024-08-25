import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import AuthProvider from './providers/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';



ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-7xl mx-auto font-Poppins '>
    


     
        <React.StrictMode>


        <AuthProvider>

        <HelmetProvider>
          <RouterProvider router={router} />
          </HelmetProvider>
          
          </AuthProvider>


        </React.StrictMode>,
      


    

  </div>
)
// ------------