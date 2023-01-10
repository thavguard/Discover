import { FC } from "react";
import { Grid } from "../Home/components/Grid/Grid";
import { PageTitle } from "../core-ui/PageTitle/PageTitle";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Profile.module.scss";
import { IUser } from "../../store/slices/auth/types";

interface Props {
    user: IUser
    isOtherProfile?: boolean
};

export const Profile: FC<Props> = ({ user, isOtherProfile = false }) => {

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
