import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppRouter } from "./components/common/AppRouter/AppRouter";
import { Header } from "./components/common/Header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { checkAuth } from "./store/slices/auth.slice";
import "./style/index.scss";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  if (isLoading) return null;

  return (
    <div id="container">
      <Header />
      <div className="content">
        <AppRouter />
      </div>
    </div>
  );
};
