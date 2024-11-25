import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import RootRoutes from "./RootRoutes";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardProfile from "../Pages/DashboardProfile/DashboardProfile";
import PrivateRoute from "./PrivateRoutes";
import TaskManagement from "../Pages/TaskManagement/TaskManagement";
import TodoArchived from "../Components/Todo Archived/TodoArchived";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootRoutes></RootRoutes>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Registration></Registration>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard/profile",
            element: (
              <PrivateRoute>
                <DashboardProfile></DashboardProfile>
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/taskManagement",
            element: (
              <PrivateRoute>
                <TaskManagement></TaskManagement>
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/archivedTodo",
            element: (
              <PrivateRoute>
                <TodoArchived />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default MainRoutes;
