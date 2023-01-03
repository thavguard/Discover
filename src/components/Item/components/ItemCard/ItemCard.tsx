import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import styles from "./ItemCard.module.scss";
import { IItem } from "../../types";
import { Icon } from "components/core-ui/Icon/Icon";

export const ItemCard = forwardRef<HTMLDivElement, IItem>(
  (
    {
      description,
      id,
      image,
      name,
      price,
      rating,
      address,
      createdAt,
      itemTypeId,
      updatedAt,
      info,
      tel,
      userId,
    }: IItem,
    ref
  ) => {
    const navigate = useNavigate();

    const navigateToItemPage = () => {
      const a = document.createElement("a");
      a.setAttribute("href", `/item/${id}`);
      a.setAttribute("target", "_blank");
      a.click();
      //   navigate(`/item/${id}`);
    };

    return (
      <div className={styles.card}>
        <div className={styles.photo} onClick={navigateToItemPage}>
          <div className={styles.img}>
            <img
              src={`${process.env.REACT_APP_API_URL}/api/item/${id}/img`}
              alt={name}
            />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <div className={styles.name} onClick={navigateToItemPage}>
              {name}
            </div>
            <div className={styles.fav}>
              <Icon name="heartSVG" size="small" />
            </div>
          </div>
          <div className={styles.price}>{price} ₽</div>
          <div className={styles.address}>
            {/* {[
              address?.region,
              address?.city,
              address?.area,
              address?.street,
              address?.house,
            ].join(" ")} */}
            Moscow
          </div>
        </div>
      </div>
    );
  }
);
