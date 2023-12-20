import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import RootRoutes from "./RootRoutes";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootRoutes></RootRoutes>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);

export default MainRoutes;
