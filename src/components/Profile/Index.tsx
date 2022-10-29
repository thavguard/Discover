import React, { useEffect } from "react";
import { Item } from "../Item/components/ItemCard/Item";
import { Grid } from "../Home/components/Grid/Grid";
import { PageTitle } from "../core-ui/PageTitle/PageTitle";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchItems } from "../../store/slices/items/items.slice";
import styles from "./Index.module.scss";
import { Loader } from "../common/Loader/Loader";

type Props = {};

export const Index = (props: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.items);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.profile}>
      <PageTitle
        title={`${user.username} profile`}
        text="Here you can create new products"
      />
      <div className={styles.your_ard}>Your ads</div>
      <Grid>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </Grid>
    </div>
  );
};
