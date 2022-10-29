import React, { createRef, useEffect, useRef, useState } from "react";
import { Item } from "../Item/components/ItemCard/Item";
import { Grid } from "./components/Grid/Grid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchItems } from "../../store/slices/items/items.slice";
import styles from "./Index.module.scss";
import { PageTitle } from "../core-ui/PageTitle/PageTitle";
import { Loader } from "../common/Loader/Loader";
import Filter from "./components/Filter/Filter";

export const Index = () => {
        const { items, itemsLoading } = useAppSelector((state) => state.items);
        const [limit, setLimit] = useState(24)


        const dispatch = useAppDispatch()
        const lastItem = createRef<HTMLDivElement>()
        const observerLoader = useRef<IntersectionObserver>();


        useEffect(() => {
            dispatch(fetchItems(limit));
        }, [limit])


        const actionInSight: IntersectionObserverCallback = (entries) => {
            if (entries[0].isIntersecting && !itemsLoading) {
                setLimit(prev => prev + 24)
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
            <div className="Home">
                <PageTitle
                    title="Welcome to Main Page"
                    text="Here you can see our products"
                />
                <div className="">
                    <Filter/>
                </div>
                <Grid>
                    {!!items.length
                        ? items.map((item, index) => {
                            if (index + 1 === items.length) {
                                return <Item key={item.id} {...item} ref={lastItem}/>
                            }
                            return <Item key={item.id} {...item}/>
                        })
                        : ""}
                </Grid>
                {itemsLoading && <div>loading</div>}
            </div>
        );
    }
;
