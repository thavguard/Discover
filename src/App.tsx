import React, { FC, useEffect } from "react";
import { AppRouter } from "./components/AppRouter/AppRouter";
import { Header } from "./components/common/Header/Header";
import { Loader } from "./components/common/Loader/Loader";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { checkAuth } from "./store/slices/auth/auth.slice";
import "./index.scss";

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

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
