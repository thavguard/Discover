import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import Cart from "../Cart/Cart";
import "./Header.scss";
import cartImg from "../../assets/images/cart.png";

type Props = {};

const Header = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { cart } = useAppSelector((state) => state.cart);
  const { username } = useAppSelector((state) => state.auth);

  const onOpenCart = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="header">
      <div className="navbar">
        <div className="navbar__link">
          <Link to={"/"}>Home</Link>
        </div>
        <div className="navbar__link">
          {username ? <Link to={"/profile"}>{username}</Link> : <Link to={"/auth"}>Sign In</Link>}
        </div>
      </div>
      <div className="header__cart" onClick={onOpenCart}>
        <img src={cartImg} alt="" /> {cart.length}
      </div>
      <Cart isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Header;
