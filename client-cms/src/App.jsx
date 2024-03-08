import { useState } from 'react'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from './assets/login';
import Home from './assets/Home';
import MainLayout from './assets/MainLayout';
import Category from './assets/Category';
import AddUser from './assets/AddUser';


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
        {
          path : "/categories",
          element: <Category />
        },
        {
          path : "/addstaff",
          element : <AddUser />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
      loader : () => {
        if(localStorage.accessToken){
          return redirect('/')
        }
        return null
      },
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
