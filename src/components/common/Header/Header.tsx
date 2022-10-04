import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import "./Header.scss";
import cartImg from "../../assets/images/cart.png";
import { logout } from "../../../store/slices/auth.slice";
import { Button } from "../../core-ui/Button/Button";

type Props = {};

export const Header = (props: Props) => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <div className="navbar">
        <div className="navbar__link">
          <Link to={"/"}>Home</Link>
        </div>
        <div className="navbar__link">
          {isAuth ? (
            <Link to={"/profile"}>{user.username}</Link>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </div>
      <div className="navbar">
        <div className="navbar__link">
          {isAuth && (
            <Button variant="withoutBorderRadius">
             <Link to={'/addItem'}> Add item</Link>
            </Button>
          )}
        </div>
        <div className="navbar__link">
          {isAuth && (
            <div className={"navbar__link--logout"} onClick={onLogout}>
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
