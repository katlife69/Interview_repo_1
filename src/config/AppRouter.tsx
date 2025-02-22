import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListJob from "../views/list";
import DetailJob from "../views/detail";
import NoMatch from "../views/error";

const notMatchRouter = {
  path: "*",
  element: <NoMatch />,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListJob />,
  },
  //   {
  //     path: "detail",
  //     element: <DetailJob />,
  //     errorElement: <NoMatch />,
  //   },
  notMatchRouter,
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
