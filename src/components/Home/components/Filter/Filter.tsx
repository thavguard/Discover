import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { fetchHomeItems, homeSlice } from "../../slice/home.slice";
import styles from "./Filter.module.scss";
import { Input } from "../../../core-ui/Input/Input";
import { Select } from "../../../core-ui/Select/Select";
import { SelectType } from "../../../Item/components/SelectType/SelectType";
import { fetchItemTypes } from "../../../../store/slices/items/items.slice";
import { Option } from "../../../core-ui/Select/types";
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
import { ITotalItems } from "components/Home/types/types";

interface Props {
  items: IItem[];
  total: ITotalItems;
}

const Filter: FC<Props> = ({ items, total }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const filter = useAppSelector((state) => state.home.filter);
  const { itemTypes, itemCharacteristics } = useAppSelector(
    (state) => state.items
  );

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [highestСost, setHighestСost] = useState<number>(0);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    dispatch(homeSlice.actions.setFilter({ ...filter, name }));
  };

  const onChangeCreator = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    dispatch(homeSlice.actions.setFilter({ ...filter, creator: value }));
  };

  const onChangeType = (id: string) => {
    dispatch(homeSlice.actions.setFilter({ ...filter, itemTypeId: id }));
  };

  // const onChangePriceFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const price = e.currentTarget.value;
  //   dispatch(
  //     homeSlice.actions.setFilter({
  //       ...filter,
  //       price: [price, filter.price[1]],
  //     })
  //   );
  // };
  // const onChangePriceTo = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const price = e.currentTarget.value;
  //   dispatch(
  //     homeSlice.actions.setFilter({
  //       ...filter,
  //       price: [filter.price[0], price],
  //     })
  //   );
  // };

  const onChangePrice = (price: number[]) => {
    console.log(price);

    dispatch(
      homeSlice.actions.setFilter({
        ...filter,
        price,
      })
    );
  };

  const onChangeDate = (date: Date) => {
    console.log(date.getTime().toString());
    dispatch(
      homeSlice.actions.setFilter({
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
    dispatch(fetchHomeItems({ filter }));
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
        <div className={styles.name}>
          <div className={styles.label}>by name</div>
          <Input
            value={filter.name}
            onChange={onChangeName}
            placeholder={"name"}
          />
        </div>
        <div className={styles.itemTypeId}>
          <div className={styles.label}>by item type</div>
          <SelectType
            options={itemTypes}
            onChange={(e) => onChangeType(e?.value.toString()!)}
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
            {/* <div className={styles.priceFrom}>
              <Input
                value={filter.price[0]}
                onChange={onChangePriceFrom}
                placeholder={"from"}
              />
            </div>
            <div className={styles.priceTo}>
              <Input
                value={filter.price[1]}
                onChange={onChangePriceTo}
                placeholder={"to"}
              />
            </div> */}
            <RangeSlider
              aria-label={["min", "max"]}
              defaultValue={[0, total.price]}
              min={0}
              max={total.price}
              onChangeEnd={onChangePrice}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
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
