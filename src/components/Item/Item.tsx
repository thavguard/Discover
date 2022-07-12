import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { cartSlice } from "../../store/slices/cart.slice";
import { ItemType } from "../../types/types";
import "./Item.scss";

const Item = ({ description, id, image, name, price, rating }: ItemType) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.items);
  const { cart } = useAppSelector((state) => state.cart);

  const inCart = cart.find((e) => e === id);

  const isInCart = () => {
    if (!inCart) {
      addToCart();
    } else {
      removeFromCart();
    }
  };

  const addToCart = () => {
    dispatch(cartSlice.actions.addToCart(id));
  };

  const removeFromCart = () => {
    dispatch(cartSlice.actions.removeFromCart(id));
  };

  return (
    <div className="item">
      <div className="item__info">
        <div className="item__name">{name}</div>
        <div className="item__desc">{description}</div>
        <div className="item__img">
          <img src={`http://localhost:5050/api/item/${id}/img`} alt={name} />
        </div>
        <div className="item__btns">
          <div className="item__price">{price} ₽</div>
          {/* <div className="item__rating">{rating}4.3</div> */}
          <div className="add_to_cart" onClick={isInCart}>
            {!inCart ? " Add to cart" : "Remove"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
