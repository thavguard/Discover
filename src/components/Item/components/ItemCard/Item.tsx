import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import styles from "./ItemCard.module.scss";
import { IItem } from "../../types";

export const Item = forwardRef<HTMLDivElement, IItem>((
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

    }: IItem, ref) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/item/${id}`);
    };

    return (
        <div className={styles.item} ref={ref}>
            <div className={styles.item__info}>
                <div onClick={handleClick}>
                    <div className={styles.item__name}>{name}</div>
                    <div className={styles.item__desc}>{description}</div>
                    <div className={styles.item__img}>
                        <img src={`http://localhost:5050/api/item/${id}/img`} alt={name}/>
                    </div>
                </div>
                <div className={styles.item__btns}>
                    <div className={styles.item__price}>{price} ₽</div>
                    {/* <div className={stylrs.item__rating}>{rating}4.3</div> */}
                    <div className={styles.add_to_favorite}>
                        {true ? " Add to favs" : "Remove"}{" "}
                        {/* вместо true сделать проверку уже добавлено в избранное? */}
                    </div>
                </div>
            </div>
        </div>
    );
});
