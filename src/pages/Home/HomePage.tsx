import React, { useEffect } from "react";
import { Item } from "../../components/Item/Item";
import { Items } from "../../components/Home/Items/Items";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchItems } from "../../store/slices/items.slice";
import "./HomePage.scss";
import { PageTitle } from "../../components/core-ui/PageTitle/PageTitle";

export const HomePage = () => {
  const { items } = useAppSelector((state) => state.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);
  return (
    <div className="Home">
      <PageTitle
        title="Welcome to Main Page"
        text="Here you can see our products"
      />
      <Items>
        {items.map((e) => (
          <Item
            key={e.id}
            name={e.name}
            description={e.description}
            price={e.price}
            rating={e.rating}
            id={e.id}
            image={e.image}
          />
        ))}
      </Items>
    </div>
  );
};
