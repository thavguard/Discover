import { FC, useEffect } from "react";
import { ItemCard } from "../../components/Item/components/ItemCard/ItemCard";
import { Grid } from "../../components/Home/components/Grid/Grid";
import { PageTitle } from "../../components/core-ui/PageTitle/PageTitle";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Profile.module.scss";

type Props = {};

export const Profile: FC<Props> = (props) => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.profile}>
            <PageTitle
                title={`${user.username} profile`}
                text="Here you can create new products"
            />
            <div className={styles.your_ard}>Your ads</div>
            <Grid>
                {/*{items.map((item) => (*/}
                {/*    <ItemCard key={item.id} {...item} />*/}
                {/*))}*/}
            </Grid>
        </div>
    );
};
