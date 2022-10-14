import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/core-ui/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./ItemPage.module.scss";
import Sticky from "react-stickynode";
import { Item } from "../../components/Item/Item";
import { Grid } from "../../components/Home/Grid/Grid";
import { Loader } from "../../components/common/Loader/Loader";
import { fetchActiveItem } from "../../store/slices/items.slice";
import { ItemCharactiristic } from "../../components/Item/ItemCharactiristic/ItemCharactiristic";

type Props = {};

export const ItemPage = (props: Props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, activeItem } = useAppSelector((state) => state.items);

  const itemsLikeIt = items.filter(
    (e) => e?.itemTypeId === activeItem?.itemTypeId && e.id !== activeItem.id
  );

  useEffect(() => {
    dispatch(fetchActiveItem(+id!));
    window.scrollTo(0, 0);
  }, [id]);

  if (!activeItem) navigate("/");
  if (!activeItem.name) return <Loader />;

  const address = activeItem.address;

  return (
    <div className={styles.item}>
      <div className={styles.itemType}>smartphones</div>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.title}>{activeItem.name}</div>
          <section className={styles.photos}>
            <img
              src={`http://localhost:5050/api/item/${activeItem.id}/img`}
              alt=""
            />
          </section>
          <section className={styles.address}>
            <h3>address</h3>
            <div>
              {address.subject}, {address.city}, {address.street},{" "}
              {address.house}, {address.area}
            </div>
          </section>
          <section>
            <h3>charactiristics</h3>
            <div className={styles.charactiristics}>
              {activeItem.info?.map((e) => (
                <ItemCharactiristic
                  title={e.title}
                  desc={e.description}
                  key={e.title}
                />
              ))}
              {activeItem.info?.map((e) => (
                <ItemCharactiristic
                  title={e.title}
                  desc={e.description}
                  key={e.title}
                />
              ))}
              {activeItem.info?.map((e) => (
                <ItemCharactiristic
                  title={e.title}
                  desc={e.description}
                  key={e.title}
                />
              ))}
            </div>
          </section>
          <section className={styles.desc}>
            <h3>description</h3>
            <div> {activeItem.description}</div>
          </section>
          <section className={styles.like_it}>
            <h3>looks like it</h3>
            <Grid columnms="repeat(3, 200px)">
              {!!items.length
                ? itemsLikeIt.map((item) => <Item key={item.id} {...item} />)
                : ""}
            </Grid>
          </section>
        </div>
        <div className={styles.sidebar}>
          <Sticky top={20} className={styles.sticky}>
            <div className={styles.price}>{activeItem.price} $</div>
            <div className={styles.info}>
              <div className={styles.phone}>
                <a className={styles.number} href={`tel:${activeItem.tel}`}>
                  <Button size="big" br="br-1">
                    {activeItem.tel}
                  </Button>
                </a>
              </div>
            </div>
          </Sticky>
        </div>
      </div>
    </div>
  );
};
