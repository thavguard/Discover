import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppRouter } from "./components/common/AppRouter/AppRouter";
import { Header } from "./components/common/Header/Header";
import { Loader } from "./components/common/Loader/Loader";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { checkAuth } from "./store/slices/auth.slice";
import { fetchItems } from "./store/slices/items.slice";
import "./style/index.scss";
import "simplebar-react/dist/simplebar.min.css";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchItems());
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div id="container">
      <Header />
      <div className="content">
        <AppRouter />
      </div>
    </div>
  );
};
