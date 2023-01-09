import { FC, useEffect, useState } from 'react';
import styles from "../Home/Home.module.scss";
import filterIcon from "../../assets/icons/filter.png";
import Filter from "../../components/Home/components/Filter/Filter";
import { Loader } from "../../components/common/Loader/Loader";
import { ItemCard } from "../../components/Item/components/ItemCard/ItemCard";
import { useMediaQuery } from "usehooks-ts";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchSearchItems } from "../../components/Search/slice/search.slice";

interface Props {

}

export const Search: FC<Props> = () => {
    const { items, itemsLoading, total, filter, page } = useAppSelector(
        (state) => state.search
    );


    const isMobile = useMediaQuery("(max-width: 600px)");
    const [showFilter, setShowFilter] = useState(!isMobile);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchSearchItems({ filter }))
    }, [filter])

    return (
        <div className={styles.home}>
            {isMobile && (
                <div
                    className={styles.filterIcon}
                    onClick={() => setShowFilter(!showFilter)}
                >
                    <img src={filterIcon} alt=""/>
                </div>
            )}

            {showFilter && (
                <div className={styles.filter}>
                    <Filter items={items} total={total}/>
                </div>
            )}

            <div className={styles.items}>
                {itemsLoading ? (
                    <Loader/>
                ) : !!items.length ? (
                    items.map((item, index) => {
                        if (index + 1 === items.length) {
                            return <ItemCard key={item.id} {...item}/>;
                        }
                        return <ItemCard key={item.id} {...item} />;
                    })
                ) : (
                    "Простите, по данному запросу пока нет товаров"
                )}
            </div>
        </div>
    );
};

