import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { fetchHomeItems } from "../../slice/home.slice";
import styles from "./Filter.module.scss";
import { Input } from "../../../core-ui/Input/Input";
import { SelectType } from "../../../Item/components/SelectType/SelectType";
import { fetchItemTypes } from "../../../Item/slice/items.slice";
import Calendar from "react-calendar";
import "../../../core-ui/Calendar/Calendar.scss";
import { Button } from "../../../core-ui/Button/Button";
import { useMediaQuery, useOnClickOutside } from "usehooks-ts";
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
} from "@chakra-ui/react";
import { IItem } from "components/Item/types";
import { Loader } from "components/common/Loader/Loader";
import { IFilterItems, ITotalItems } from "components/Home/types/types";
import { fetchSearchItems, searchSlice } from "../../../Search/slice/search.slice";

interface Props {
    items: IItem[];
    total: ITotalItems;
}

const Filter: FC<Props> = ({ items, total, }) => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 600px)");

    const { filter } = useAppSelector(state => state.search)
    const { itemTypes, itemCharacteristics } = useAppSelector(
        (state) => state.items
    );

    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.value;
        dispatch(searchSlice.actions.setFilter({ ...filter, name }));
    };

    const onChangeCreator = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        dispatch(searchSlice.actions.setFilter({ ...filter, creator: value }));
    };

    const onChangeType = (id: string) => {
        dispatch(searchSlice.actions.setFilter({ ...filter, itemTypeId: id }));
    };

    const onChangePrice = (price: number[]) => {
        console.log(price);

        dispatch(
            searchSlice.actions.setFilter({
                ...filter,
                price,
            })
        );
    };

    const onChangeDate = (date: Date) => {
        console.log(date.getTime().toString());
        dispatch(
            searchSlice.actions.setFilter({
                ...filter,
                wasCreated: date.getTime().toString(),
            })
        );
    };

    const handleClickOutside = (e: MouseEvent) => {
        setShowCalendar(false);
    };

    useEffect(() => {
        dispatch(fetchItemTypes());
    }, []);

    useEffect(() => {
        dispatch(fetchSearchItems({ filter }))
    }, [filter]);

    useOnClickOutside(ref, handleClickOutside);

    // useEffect(() => {
    //   if (items.length) {
    //     const maxPrice = items.reduce((acc, curr) =>
    //       acc.price > curr.price ? acc : curr
    //     );
    //     setHighestСost(maxPrice.price);
    //   }
    // }, [items]);

    // if (!highestСost) return null;

    if (!total.price) return null;

    return (
        <div className={styles.container}>
            <div className={styles.title}>Filter</div>
            <div className={styles.filter}>
                <div className={styles.itemTypeId}>
                    <div className={styles.label}>by item type</div>
                    <SelectType
                        options={itemTypes}
                        onChange={(e) => onChangeType(e.toString())}
                    />
                </div>
                <div className={styles.creator}>
                    <div className={styles.label}>by creator</div>
                    <Input
                        value={filter.creator}
                        onChange={onChangeCreator}
                        placeholder={"creator"}
                    />
                </div>
                <div className={styles.selectPrice}>
                    <div className={styles.label}>by price</div>
                    <div className={styles.price}>
                        <RangeSlider
                            aria-label={["min", "max"]}
                            defaultValue={[0, total.price]}
                            min={0}
                            max={total.price}
                            onChangeEnd={onChangePrice}
                        >
                            <RangeSliderTrack>
                                <RangeSliderFilledTrack/>
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0}/>
                            <RangeSliderThumb index={1}/>
                        </RangeSlider>
                    </div>
                </div>
                <div className={styles.selectDate} ref={ref}>
                    <div className={styles.label}>by date</div>
                    <Button
                        onClick={() => setShowCalendar(!showCalendar)}
                        br={"br-0"}
                        fullwidth={isMobile}
                    >
                        Select date
                    </Button>
                    {showCalendar && (
                        <div className={styles.calendar}>
                            <Calendar
                                onChange={onChangeDate}
                                value={new Date(+filter.wasCreated)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filter;
