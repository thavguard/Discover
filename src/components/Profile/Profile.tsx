import { FC, useEffect, useState } from "react";
import { GridItems } from "../Home/components/Grid/GridItems";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Profile.module.scss";
import { IUser } from "../../store/slices/auth/types";
import { IItem, IItemsResponse } from "../Item/types";
import { ItemCard } from "../Item/components/ItemCard/ItemCard";
import { axios } from "../../API/axios";
import { Loader } from "../common/Loader/Loader";
import { Avatar, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { getRole } from "../../utils/getRole";
import { Button } from "../core-ui/Button/Button";
import { logout } from "../../store/slices/auth/auth.slice";
import urls from "../../settings/urls.json";
import { useNavigate } from "react-router-dom";
import Sticky from "react-stickynode";

const profileTabs = ['My items', 'Favorite list']

interface Props {
    user: IUser
    isOtherProfile?: boolean
};

export const Profile: FC<Props> = ({ user, isOtherProfile = false }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [items, setItems] = useState<IItem[]>([])
    const [favoriteItems, setFavoriteItems] = useState<IItem[]>([])

    const state = useAppSelector(state => state.items)


    const fetchUserItems = async () => {
        setItems([])
        const { data } = await axios.get<IItemsResponse>('api/item', {
            params: {
                userId: user.id
            }
        })

        setItems(data.items)
    }

    const fetchFavoriteItems = async () => {
        setFavoriteItems([])

        const { data } = await axios.get<IItem[]>('api/fav_items')

        setFavoriteItems(data)

    }


    const onLogout = async () => {
        await dispatch(logout());
        navigate(urls.login);
    };

    useEffect(() => {
        fetchUserItems()

    }, [user])

    useEffect(() => {
        if (state.favoriteItems.length) {
            if (!isOtherProfile) fetchFavoriteItems()
        }
    }, [state.favoriteItems])

    return (
        <div className={styles.profile}>
            <div className={styles.sidebar}>
                <Sticky top={76}>
                    <div className={styles.user}>
                        <Avatar name={user.username}
                                src={`${process.env.REACT_APP_API_URL}/static/${user.avatar}`}
                                size={'2xl'}/>
                        <div className={styles.info}>
                            <div className={styles.username}>{user.username}</div>
                            <div className={styles.email}>
                                <a href={`mailto:${user.email}`} target={'_blank'}>
                                    {user.email}
                                </a>
                            </div>
                            <div className={styles.role}>{getRole(user.role)}</div>
                            <div className={styles.phone}>
                                {!isOtherProfile ?
                                    <div className={styles.logout} onClick={onLogout}>Logout</div>
                                    : <a href={`tel:89999999999`}>
                                        <Button fullwidth>{user.phone} 89999999999</Button>
                                    </a>}


                            </div>

                        </div>

                    </div>
                </Sticky>
            </div>
            <div className={styles.container}>
                {
                    isOtherProfile
                        ?
                        <div className={styles.my_items}>
                            <GridItems>
                                {items.length ? items.map(item => <ItemCard {...item}/>) : <Loader/>}
                            </GridItems>
                        </div>
                        :
                        <Tabs isFitted variant='line'>
                            <TabList mb='1em'>
                                {profileTabs.map(tab => <Tab _selected={{ borderColor: 'primary.200' }}>{tab}</Tab>)}
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <div className={styles.my_items}>
                                        <GridItems>
                                            {items.length ? items.map(item => <ItemCard {...item}/>) : <Loader/>}
                                        </GridItems>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className={styles.favorite_items}>
                                        {
                                            favoriteItems.length
                                                ? <GridItems>{favoriteItems.map(item =>
                                                    <ItemCard {...item}/>)}</GridItems>
                                                :
                                                <div>У вас пока нет товаров в избранном!</div>
                                        }
                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                }


            </div>
        </div>
    );
};
