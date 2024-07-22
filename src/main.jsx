import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import store from "./redux/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Login, MainVideo, Signup, UpdateVideo, YTStudio } from "./pages/pageIndex.js";
import { AuthWrapper } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: (
          <AuthWrapper authentication={false}>
            <Login />
          </AuthWrapper>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthWrapper authentication={false}>
            <Signup />
          </AuthWrapper>
        ),
      },
      {
        path: "studio",
        element: (
          <AuthWrapper>
            <YTStudio />
          </AuthWrapper>
        ),
      },
      {
        path: "video/:videoId",
        element: (
          <AuthWrapper>
            <MainVideo />
          </AuthWrapper>
        )
      },
      {
        path: "studio/updatepost/:videoId",
        element: (
          <AuthWrapper>
            <UpdateVideo />
          </AuthWrapper>
        )
      },
      {
        path: "*",
        element: <h1>No Component Defined</h1>,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
