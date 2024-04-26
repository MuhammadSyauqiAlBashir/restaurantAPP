import { useState } from 'react'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from './views/login';
import Home from './views/Home';
import MainLayout from './components/MainLayout';
import Category from './views/Category';
import AddUser from './views/AddUser';


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
