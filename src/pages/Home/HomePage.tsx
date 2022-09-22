import React, { useEffect } from "react";
import Item from "../../components/Item/Item";
import Items from "../../components/Home/Items/Items";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchItems } from "../../store/slices/items.slice";
import "./HomePage.scss";
import Title from "../../components/core-ui/Title/Title";

const HomePage = () => {
  const { items } = useAppSelector((state) => state.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);
  return (
    <div className="Home">
      <Title
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

export default HomePage;
