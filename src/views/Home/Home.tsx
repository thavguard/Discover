import {
  FC,
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Item } from "../../components/Item/components/ItemCard/Item";
import { Grid } from "../../components/Home/components/Grid/Grid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Home.module.scss";
import { PageTitle } from "../../components/core-ui/PageTitle/PageTitle";
import Filter from "../../components/Home/components/Filter/Filter";
import {
  fetchHomeItems,
  homeSlice,
} from "../../components/Home/slice/home.slice";
import { useMediaQuery } from "usehooks-ts";
import filterIcon from "../../assets/icons/filter.png";
import { Loader } from "components/common/Loader/Loader";

export const Home: FC = () => {
  const { items, itemsLoading, total, filter, page } = useAppSelector(
    (state) => state.home
  );

  const isMobile = useMediaQuery("(max-width: 600px)");
  const [showFilter, setShowFilter] = useState(!isMobile);

  useEffect(() => {
    setShowFilter(!isMobile);
  }, [isMobile]);

  const dispatch = useAppDispatch();
  const lastItem = createRef<HTMLDivElement>();
  const observerLoader = useRef<IntersectionObserver>();

  useEffect(() => {
    dispatch(fetchHomeItems({ page, filter })); // TODO: пофиксить двойной запрос при загрузке страницы
  }, [page, filter]);

  const actionInSight: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting && !itemsLoading && page < total.pages) {
      dispatch(homeSlice.actions.setPage(page + 1));
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
  }, [lastItem]);

  return (
    <div className={styles.home}>
      {isMobile && (
        <div
          className={styles.filterIcon}
          onClick={() => setShowFilter(!showFilter)}
        >
          <img src={filterIcon} alt="" />
        </div>
      )}

      {showFilter && (
        <div className={styles.filter}>
          <Filter items={items} total={total} />
        </div>
      )}

      <div className={styles.items}>
        {itemsLoading ? (
          <Loader />
        ) : !!items.length ? (
          items.map((item, index) => {
            if (index + 1 === items.length) {
              return <Item key={item.id} {...item} ref={lastItem} />;
            }
            return <Item key={item.id} {...item} />;
          })
        ) : (
          "Простите, по данному запросу пока нет товаров"
        )}
      </div>
    </div>
  );
};
