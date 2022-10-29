import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import "./Header.scss";
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
            <Link to={"/addItem"}>
              <Button br="br-0">Add item</Button>
            </Link>
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
