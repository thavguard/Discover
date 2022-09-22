import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchItems } from "../../../store/slices/items.slice";
import Item from "../../Item/Item";
import "./Items.scss";

type Props = {
  children: React.ReactNode;
};

const Items = ({ children }: Props) => {
  return (
    <div className="items-container">
      <div className="items">{children}</div>
    </div>
  );
};

export default Items;
