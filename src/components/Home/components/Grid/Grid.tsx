import { FC, PropsWithChildren, UIEvent } from "react";
import "./Grid.scss";

interface Props {
    columns?: string;
    gap?: string;
    onScroll?: (e: UIEvent<HTMLElement>) => void
};

export const Grid: FC<PropsWithChildren<Props>> = (
    {
        children,
        columns = "repeat(4, 200px)",
        gap = "20px 15px",
        onScroll
    }) => {
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
