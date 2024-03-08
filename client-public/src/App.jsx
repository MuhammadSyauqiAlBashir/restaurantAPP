import './App.css'
import Navbar from './components/navbar'
import Test from './components/test';
import DetailCuisine from './pages/DetailCuisine';
import PubCuisine from './pages/PubCuisine'
import {
  createBrowserRouter,
  RouterProvider, redirect
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PubCuisine />,
  },
  {
    path: "/detail/:id",
    element: <DetailCuisine />,
  },{
    path: "/test",
    element : <Test/>
  }

]);

function App() {
  return <RouterProvider router={router} />

}

export default App
