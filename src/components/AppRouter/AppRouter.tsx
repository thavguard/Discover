import React, { FC, lazy, ReactNode, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import urls from 'settings/urls.json'

import { Profile } from 'views/Profile/Profile'
import { Home } from 'views/Home/Home'
import { AddItem } from 'views/AddItem/AddItem'
import { ItemPage } from 'views/Item/ItemPage'
import { Login } from 'views/Login/Login'
import { Signup } from 'views/Signup/Signup'
import { Search } from 'views/Search/Search'
import * as url from "url";


type Props = {};

interface IRoute {
    path: string
    component: any
}

const authRoutes: IRoute[] = [
    {
        path: urls.profile,
        component: <Profile/>
    },
    {
        path: urls.item.add,
        component: <AddItem/>
    }, {
        path: urls.item.root + urls.item.id + urls.item.edit,
        component: <ItemPage/>
    },
]


const publicRoutes: IRoute[] = [
    {
        path: urls.home,
        component: <Home/>
    }, {
        path: urls.item.root + urls.item.id,
        component: <ItemPage/>
    },
    {
        path: urls.search,
        component: <Search/>
    },
]

const notAuth: IRoute[] = [
    {

        path: urls.login,
        component: <Login/>
    },
    {

        path: urls.signup,
        component: <Signup/>
    },
]

export const AppRouter = ({}: Props) => {
    const { isAuth, isInitDone } = useAppSelector((state) => state.auth);

    if (!isInitDone) return null;


    return <Routes>
        {
            isAuth
                ?
                authRoutes.map(item => <Route key={item.path} path={item.path} element={item.component}/>)
                :
                notAuth.map(item => <Route key={item.path} path={item.path} element={item.component}/>)
        }
        {publicRoutes.map(item => <Route key={item.path} path={item.path} element={item.component}/>)}
        <Route path="*" element={<Navigate to={urls.home}/>}/>
    </Routes>


};
