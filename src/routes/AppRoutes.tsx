import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { Profile } from "../pages/Profile";
import { Login } from "../pages/Login";
import { Logout } from "../pages/Logout";
import { Home } from "../pages/Home";
import { Settings } from "../pages/Settings";
export const AppRoutes: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.User.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {isAuthenticated ? (
        <>
          <Route index element={<Home />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
        </>
      ) : (
        <Route path="login" element={<Login />} />
      )}
    </Routes>
  );
};
