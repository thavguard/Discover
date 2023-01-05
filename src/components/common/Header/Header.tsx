import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import styles from "./Header.module.scss";
import cartImg from "../../assets/images/cart.png";
import { logout } from "../../../store/slices/auth/auth.slice";
import { Button } from "../../core-ui/Button/Button";
import urls from 'settings/urls.json'

type Props = {};

export const Header = (props: Props) => {
    const { isAuth, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());
        navigate(urls.login);
    };


    return (
        <div className={styles.header}>
            <div className={styles.navbar}>
                <div className={styles.logo}>
                    <span onClick={() => navigate(urls.home)}>Discover</span>
                </div>
                <div className={styles.buttons}>
                    {!!isAuth
                        ?
                        <>
                            <div className={styles.navBtn}>
                                <Button weight={600} onClick={() => navigate(urls.item.add)}>Place an ad</Button>
                            </div>
                            <div className={styles.navBtn} onClick={() => navigate(urls.profile)}>
                                <div className={styles.user}>
                                    {user.username}
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className={styles.navBtn}>
                                <Button weight={600} onClick={() => navigate(urls.login)}>LOG IN</Button></div>
                            <div className={styles.navBtn}>
                                <Button
                                    variant={'outlined'}
                                    onClick={() => navigate(urls.signup)}
                                >
                                    Sign up
                                </Button>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className={styles.search}></div>
        </div>
    );
};
