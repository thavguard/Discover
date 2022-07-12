import React from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import { cartSlice } from "../../../store/slices/cart.slice";
import "./CartItem.scss";

type Props = {
  name: string;
  price: number;
  id: number;
};

const CartItem = ({ name, id, price }: Props) => {

    const dispatch = useAppDispatch()

  const onDeleteItem = () => {
    dispatch(cartSlice.actions.removeFromCart(id))
  };

  return (
    <div className="cart-item">
      <div className="cart-item__name">{name}</div>
      <div className="cart-item__price">{price} $</div>
      {/* <img src={`https://localhost/api/item/${id}/img`} alt="" /> */}
      <div className="cart-item__delete" onClick={onDeleteItem}>
        delete
      </div>
    </div>
  );
};

export default CartItem;
