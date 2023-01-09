import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import styles from "./Header.module.scss";
import cartImg from "../../assets/images/cart.png";
import { logout } from "../../../store/slices/auth/auth.slice";
import { Button } from "../../core-ui/Button/Button";
import urls from 'settings/urls.json'
import { Input } from "../../core-ui/Input/Input";
import { searchSlice } from "../../Search/slice/search.slice";
import { useSearchParams } from "react-router-dom";
import Sticky from "react-stickynode";


type Props = {};

export const Header: FC<Props> = ({}) => {
    const { isAuth, user } = useAppSelector((state) => state.auth);
    const { filter } = useAppSelector(state => state.search)

    const [sticky, setSticky] = useState<boolean>(true)

    const url = window.location.pathname


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.value;
        dispatch(searchSlice.actions.setFilter({ ...filter, name }));
    }

    const onSearch = () => {
        if (filter.name) {
            navigate(urls.search)
        }
    }

    const onLogout = () => {
        dispatch(logout());
        navigate(urls.login);
    };

    useEffect(() => {
        setSticky(!url.includes(urls.item.root))
    }, [url])


    return (
        <div className={styles.header}>
            <div className={styles.navbar}>
                <div className={styles.logo}>
                    <span onClick={() => navigate(urls.home)}>Discover</span>
                </div>
                <div className={styles.buttons}>
                    {!!isAuth
                        ?
                        <>
                            <div className={styles.navBtn}>
                                <Button weight={600} onClick={() => navigate(urls.item.add)}>Place an ad</Button>
                            </div>
                            <div className={styles.navBtn} onClick={() => navigate(urls.profile)}>
                                <div className={styles.user}>
                                    {user.username}
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className={styles.navBtn}>
                                <Button weight={600} onClick={() => navigate(urls.login)}>LOG IN</Button></div>
                            <div className={styles.navBtn}>
                                <Button
                                    variant={'outlined'}
                                    onClick={() => navigate(urls.signup)}
                                >
                                    Sign up
                                </Button>
                            </div>
                        </>
                    }
                </div>
            </div>
            <Sticky enabled={sticky} innerZ={1000}>
                <div className={styles.search}>
                    <div className={styles.input__box}>
                        <div className={styles.input}>
                            <Input value={filter.name} onChange={onChangeName} placeholder={'find somethings'}/>
                        </div>
                        <div className={styles.search__btn} onClick={onSearch}>Search</div>
                    </div>
                </div>
            </Sticky>

        </div>
    );
};
