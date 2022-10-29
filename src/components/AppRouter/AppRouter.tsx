import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { Loader } from "../common/Loader/Loader";

type Props = {};

export const AppRouter = (props: Props) => {
  const { isAuth, isInitDone } = useAppSelector((state) => state.auth);

  if (!isInitDone) return null;

  const Profile = React.lazy(() =>
    import("../Profile/Index").then((module) => ({
      default: module.Index,
    }))
  );

  const HomePage = React.lazy(() =>
    import("../Home/Index").then((module) => ({
      default: module.Index,
    }))
  );

  const Login = React.lazy(() =>
    import("../Login/Index").then((module) => ({
      default: module.Login,
    }))
  );

  const Signup = React.lazy(() =>
    import("../Signup/Index").then((module) => ({
      default: module.Signup,
    }))
  );

  const AddItem = React.lazy(() =>
    import("../Item/pages/AddItem/AddItem").then((module) => ({
      default: module.AdddItem,
    }))
  );

  const ItemPage = React.lazy(() =>
    import("../Item/Index").then((module) => ({
      default: module.Index,
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
      <Route
        path="/item/:id"
        element={
          <Suspense fallback={<Loader />}>
            <ItemPage />
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
      <Route
        path="/item/:id"
        element={
          <Suspense fallback={<Loader />}>
            <ItemPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
