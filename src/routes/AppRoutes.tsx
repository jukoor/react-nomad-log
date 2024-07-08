import { Routes, Route, RouteProps } from "react-router-dom";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Settings } from "../pages/Settings";
import { FC, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import PrivateRoute from "./PrivateRoute";

export const AppRoutes: FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const appRoutes: RouteProps[] = [
    { path: "/", index: true, element: <Home /> },
    { path: "profile/:userId", element: <Profile /> },
    {
      path: "/settings",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <Settings />
        </PrivateRoute>
      ),
    },
  ];

  return (
    <Routes>
      {appRoutes.map((route, idx) => (
        <Route
          key={idx}
          index={route.index}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
};
