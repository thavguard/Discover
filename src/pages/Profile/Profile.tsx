import React, { useEffect } from "react";
import { Item } from "../../components/Item/Item";
import { Grid } from "../../components/Home/Grid/Grid";
import { PageTitle } from "../../components/core-ui/PageTitle/PageTitle";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchItems } from "../../store/slices/items.slice";
import "./Profile.scss";
import { Loader } from "../../components/common/Loader/Loader";

type Props = {};

export const Profile = (props: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.items);
  const dispatch = useAppDispatch();

  return (
    <div className="profile">
      <PageTitle
        title={`${user.username} profile`}
        text="Here you can create new products"
      />
      <div className="your-ads">Your ads</div>
      <Grid>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </Grid>
    </div>
  );
};
