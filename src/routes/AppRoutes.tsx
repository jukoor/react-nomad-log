import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Home />}></Route>
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />} />
        </>
      )}
      {/* 404: redirect home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
