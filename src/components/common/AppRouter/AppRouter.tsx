import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../../hooks/hooks";
import { Login } from "../../../pages/Auth/Login/LoginPage";
import { Signup } from "../../../pages/Auth/Signup/SignupPage";
import HomePage from "../../../pages/Home/HomePage";
import Profile from "../../../pages/Profile/Profile";

type Props = {};

const AppRouter = (props: Props) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return !!isAuth ? (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Signup />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default AppRouter;
