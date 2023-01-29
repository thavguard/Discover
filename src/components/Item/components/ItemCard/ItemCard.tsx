import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import styles from "./ItemCard.module.scss";
import { IItem } from "../../types";
import { Icon } from "components/core-ui/Icon/Icon";
import urls from 'settings/urls.json'
import Like from "../../../core-ui/Like/Like";
import { addFavoriteItem, fetchFavoriteItems, removeFavoriteItem } from "../../slice/items.slice";

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
            size = 'default'
        },
        ref
    ) => {
        const navigate = useNavigate();
        const dispatch = useAppDispatch()

        const { favoriteItems } = useAppSelector(state => state.items)
        const { isAuth } = useAppSelector(state => state.auth)

        const [isFav, setIsFav] = useState<boolean>(false)

        const navigateToItemPage = () => {
            const a = document.createElement("a");
            a.setAttribute("href", urls.item.root + `/${id}`);
            a.setAttribute("target", "_blank");
            a.click();
        };

        const addToFav = async () => {
            if (isAuth) {
                if (isFav) {
                    const success = await dispatch(removeFavoriteItem(id))
                    if (success) {
                        setIsFav(false)
                    }
                } else {
                    const success = await dispatch(addFavoriteItem(id))
                    if (success) {
                        setIsFav(true)
                    }
                }

                dispatch(fetchFavoriteItems())  // TODO: Отладить алгоритм обновления избранных товаров
            } else {
                navigate(urls.login)
            }
        }


        useEffect(() => {
            if (isAuth) {
                setIsFav(favoriteItems.some(item => item.itemId === id))
            }
        }, [favoriteItems])

        return (
            <div className={styles.card} data-size={size}>
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
                        <div className={styles.fav} onClick={addToFav}>
                            <Like isActive={isFav}/>
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
