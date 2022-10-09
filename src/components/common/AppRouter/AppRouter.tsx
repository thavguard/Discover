import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../../hooks/hooks";
import { Loader } from "../Loader/Loader";

type Props = {};

export const AppRouter = (props: Props) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  const Profile = React.lazy(() =>
    import("../../../pages/Profile/Profile").then((module) => ({
      default: module.Profile,
    }))
  );

  const HomePage = React.lazy(() =>
    import("../../../pages/Home/HomePage").then((module) => ({
      default: module.HomePage,
    }))
  );

  const Login = React.lazy(() =>
    import("../../../pages/Auth/Login/LoginPage").then((module) => ({
      default: module.Login,
    }))
  );

  const Signup = React.lazy(() =>
    import("../../../pages/Auth/Signup/SignupPage").then((module) => ({
      default: module.Signup,
    }))
  );

  const AddItem = React.lazy(() =>
    import("../../../pages/Profile/AddItem/AddItem").then((module) => ({
      default: module.AdddItem,
    }))
  );


  return !!isAuth ? (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="profile"
        element={
          <Suspense fallback={<Loader />}>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path="addItem"
        element={
          <Suspense fallback={<Loader />}>
            <AddItem />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="registration"
        element={
          <Suspense fallback={<Loader />}>
            <Signup />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
