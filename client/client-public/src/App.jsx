import "./App.css";
import MainLayout from "./components/MainLayout";
import DetailCuisine from "./pages/DetailCuisine";
import PubCuisine from "./pages/PubCuisine";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { 
        path: "/", 
        element: <PubCuisine /> 
      },
      {
        path: "/detail/:id",
        element: <DetailCuisine />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
