import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { fetchItems } from "../../../../store/slices/items/items.slice";
import { ItemCard } from "../../../Item/components/ItemCard/ItemCard";
import "./Grid.scss";

type Props = {
    columns?: string;
    gap?: string;
    onScroll?: (e: React.UIEvent<HTMLElement>) => void
    children: React.ReactNode;
};

export const Grid = (
    {
        children,
        columns = "repeat(4, 200px)",
        gap = "20px 15px",
        onScroll
    }: Props) => {
    return (
        <div className="grid-container" onScroll={onScroll}>
            <div
                className="grid"
                style={{
                    gridTemplateColumns: columns,
                    gap,
                }}
            >
                {children}
            </div>
        </div>
    );
};
