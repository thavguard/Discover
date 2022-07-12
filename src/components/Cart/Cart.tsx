import React, { useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import "./Cart.scss";
import CartItem from "./CartItem/CartItem";

type Props = {
  setIsModalOpen: (isModalOpen: boolean) => void;
  isModalOpen: boolean;
};

const Cart = ({ setIsModalOpen, isModalOpen }: Props) => {
  const { items } = useAppSelector((state) => state.items);
  const { cart } = useAppSelector((state) => state.cart);

  const cartInner = items.filter((item) =>
    cart.find((cart) => cart === item.id)
  );

  const onCloseModal = () => {
    setIsModalOpen(false);
    console.log("close");
    console.log(isModalOpen);
  };

  return isModalOpen ? (
    <div className="cart">
      <div className="cart-header">
        <div className="cart__close" onClick={onCloseModal}>
          close
        </div>
        <div className="cart__counter">Items in cart: {cartInner.length}</div>
      </div>

      <div className="cart__items">
        <div>
          {cartInner.length ? (
            cartInner.map((e) => (
              <CartItem key={e.id} id={e.id} name={e.name} price={e.price} />
            ))
          ) : (
            <div className="cart-empty">Сart is empty :c</div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
