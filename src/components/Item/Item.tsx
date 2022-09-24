import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { ItemType } from "../../types/types";
import "./Item.scss";

export const Item = ({
  description,
  id,
  image,
  name,
  price,
  rating,
}: ItemType) => {
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
          <div className="add_to_favorite">
            {true ? " Add to favs" : "Remove"}{" "}
            {/* вместо true сделать проверку уже добавлено в избранное? */}
          </div>
        </div>
      </div>
    </div>
  );
};
