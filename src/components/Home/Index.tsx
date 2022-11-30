import React, { createRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Item } from "../Item/components/ItemCard/Item";
import { Grid } from "./components/Grid/Grid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Index.module.scss";
import { PageTitle } from "../core-ui/PageTitle/PageTitle";
import Filter from "./components/Filter/Filter";
import { fetchHomeItems, homeSlice } from "./slice/home.slice";

export const Index = () => {
        const { items, itemsLoading, totalPages, filter, page } = useAppSelector((state) => state.home);

        const dispatch = useAppDispatch()
        const lastItem = createRef<HTMLDivElement>()
        const observerLoader = useRef<IntersectionObserver>();


        useEffect(() => {
            dispatch(fetchHomeItems({ page, filter })); // TODO: пофиксить двойной запрос при загрузке страницы
        }, [page, filter])


        const actionInSight: IntersectionObserverCallback = (entries) => {
            if (entries[0].isIntersecting && !itemsLoading && page < totalPages) {
                dispatch(homeSlice.actions.setPage(page + 1))
            }
        };

        useEffect(() => {
            if (observerLoader.current) {
                observerLoader.current.disconnect();
            }

            observerLoader.current = new IntersectionObserver(actionInSight);
            if (lastItem.current) {
                observerLoader.current.observe(lastItem.current);
            }
        }, [lastItem])


        return (
            <div className={styles.home}>
                <PageTitle
                    title="Welcome to Main Page"
                    text="Here you can see our products"
                />
                <div className="">
                    <Filter/>
                </div>
                <div className={styles.items}>
                    {!!items.length
                        ? items.map((item, index) => {
                            if (index + 1 === items.length) {
                                return <Item key={item.id} {...item} ref={lastItem}/>
                            }
                            return <Item key={item.id} {...item}/>
                        })
                        : ""}
                </div>
                {itemsLoading && <div>loading</div>}
            </div>
        );
    }
;
