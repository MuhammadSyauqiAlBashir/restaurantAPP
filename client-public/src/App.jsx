import './App.css'
import Navbar from './components/navbar'
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
  },

]);

function App() {
  return <RouterProvider router={router} />

}

export default App
