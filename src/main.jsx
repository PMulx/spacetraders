import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import Index from "./routes/index";
import ErrorPage from "./error-page";
import EditContact, { action as editAction } from "./routes/edit";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import { action as destroyAction } from "./routes/destroy";
import "./index.css";
import Home from "./routes/home";
import Profil from "./routes/profil";
import Buy from "./routes/buy";

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
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "profil",
            element: <Profil />,
          },
          {
            path: "buy",
            element: <Buy />,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oups, petite erreur ici...</div>,
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
