import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import styles from "./Header.module.scss";
import cartImg from "../../assets/images/cart.png";
import { logout } from "../../../store/slices/auth/auth.slice";
import { Button } from "../../core-ui/Button/Button";

type Props = {};

export const Header = (props: Props) => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("./login");
  };

  return (
    <div className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.navbar__link}>
          <Link to={"/"}>Home</Link>
        </div>
        <div className={styles.navbar__link}>
          {isAuth ? (
            <Link to={"/profile"}>{user.username}</Link>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </div>
      <div className={styles.navbar}>
        <div className={styles.navbar__link}>
          {isAuth && (
            <Link to={"/addItem"}>
              <Button weight={600}>Add item</Button>
            </Link>
          )}
        </div>
        <div className={styles.navbar__link}>
          {isAuth && (
            <div className={styles.navbar__link__logout} onClick={onLogout}>
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
