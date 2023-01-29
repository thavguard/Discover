import React, { FC, useEffect } from "react";
import { AppRouter } from "./components/AppRouter/AppRouter";
import { Header } from "./components/common/Header/Header";
import { Loader } from "./components/common/Loader/Loader";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { checkAuth } from "./store/slices/auth/auth.slice";
import "./index.scss";
import { fetchFavoriteItems, fetchItemTypes } from "./components/Item/slice/items.slice";

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading, user, isAuth } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
        dispatch(fetchItemTypes())
    }, []);

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchFavoriteItems())
        }
    }, [user])

    if (isLoading) return <Loader/>;

    return (
        <>
            <Header/>
            <div id="container">
                <div className="content">
                    <AppRouter/>
                </div>
            </div>
        </>
    );
};
