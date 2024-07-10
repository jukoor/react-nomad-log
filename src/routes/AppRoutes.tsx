import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Settings } from "../pages/Settings";
import { FC, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

export const AppRoutes: FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route index={true} path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </>
      ) : (
        <>
          <Route index={true} path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
