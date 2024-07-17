import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/HomePage";
import { Profile } from "../pages/ProfilePage";
import { Settings } from "../pages/SettingsPage";
import { FC } from "react";
import PrivateRoute from "./PrivateRoute";

export const AppRoutes: FC = () => {
  return (
    <Routes>
      {/* Home */}
      <Route index={true} path="/" element={<Home />} />
      {/* Profile */}
      <Route
        path="/profile/:userId"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      {/* Settings */}
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      {/* 404 */}
      <Route
        path="*"
        element={
          <PrivateRoute>
            <Navigate to="/" />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
