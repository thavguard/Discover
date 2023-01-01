import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/core-ui/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./ItemPage.module.scss";
import Sticky from "react-stickynode";
import { Item } from "../../components/Item/components/ItemCard/Item";
import { Grid } from "../../components/Home/components/Grid/Grid";
import { Loader } from "../../components/common/Loader/Loader";
import { fetchActiveItem } from "../../store/slices/items/items.slice";
import { ItemCharacteristic } from "../../components/Item/components/ItemCharactiristic/ItemCharacteristic";
import { useMediaQuery } from "usehooks-ts";

type Props = {};

export const ItemPage: FC<Props> = (props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

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
              src={`${process.env.REACT_APP_API_URL}/api/item/${activeItem.id}/img`}
              alt=""
            />
          </section>
          {isMobile && (
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
          )}
          <section>
            <h3>address</h3>
            <div className={styles.address}>
              {address?.region ? `${address?.region}, ` : ""}
              {address?.city ? `${address?.city}, ` : ""}
              {address?.street ? `${address?.street}, ` : ""}
              {address?.house ? `${address?.house}, ` : ""}
              {address?.area ? `${address?.area}` : ""}
            </div>
          </section>
          <section>
            <h3>characteristics</h3>
            <div className={styles.characteristics}>
              {activeItem.info?.map((e) => (
                <ItemCharacteristic
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
            <Grid columns="repeat(3, 200px)">
              {!!items.length
                ? itemsLikeIt.map((item) => <Item key={item.id} {...item} />)
                : ""}
            </Grid>
          </section>
        </div>
        {!isMobile && (
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
        )}
      </div>
    </div>
  );
};
