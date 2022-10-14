import React, { useEffect } from "react";
import { Item } from "../../components/Item/Item";
import { Grid } from "../../components/Home/Grid/Grid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchItems } from "../../store/slices/items.slice";
import "./HomePage.scss";
import { PageTitle } from "../../components/core-ui/PageTitle/PageTitle";
import { Loader } from "../../components/common/Loader/Loader";

export const HomePage = () => {
  const { items } = useAppSelector((state) => state.items);

  console.log(items);

  console.log(items.filter((e) => e.info));

  return (
    <div className="Home">
      <PageTitle
        title="Welcome to Main Page"
        text="Here you can see our products"
      />
      <Grid>
        {!!items.length
          ? items.map((item) => <Item key={item.id} {...item} />)
          : ""}
      </Grid>
    </div>
  );
};
