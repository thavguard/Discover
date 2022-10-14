import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchItems } from "../../../store/slices/items.slice";
import { Item } from "../../Item/Item";
import "./Grid.scss";

type Props = {
  columnms?: string;
  gap?: string;
  children: React.ReactNode;
};

export const Grid = ({
  children,
  columnms = "repeat(4, 200px)",
  gap = "20px 15px",
}: Props) => {
  return (
    <div className="grid-container">
      <div
        className="grid"
        style={{
          gridTemplateColumns: columnms,
          gap,
        }}
      >
        {children}
      </div>
    </div>
  );
};
