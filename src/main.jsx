import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import Index from "./routes/index";
import ErrorPage from "./error-page";
import "./index.css";
import Buy from "./routes/buy";
import Dashboard from "./routes/dashboard";
import Vaisseaux from "./routes/vaisseaux";
import Vaisseau from "./routes/vaisseau";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "vaisseaux",
            element: <Vaisseaux />,
          },
          {
            path: "vaisseau",
            element: <Vaisseau />,
          },
          {
            path: "buy",
            element: <Buy />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
