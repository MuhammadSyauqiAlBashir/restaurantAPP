import { useState } from 'react'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from './assets/login';
import Home from './assets/Home';
import MainLayout from './assets/MainLayout';


function App() {
  const router = createBrowserRouter([
    {
      element : <MainLayout />,
      loader : () => {
        if(!localStorage.accessToken){
          return redirect('/login')
        }
        return null
      },
      children : [
        {
          path : "/",
          element: <Home />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
