import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/core-ui/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./ItemPage.module.scss";
import Sticky from "react-stickynode";
import { ItemCard } from "../../components/Item/components/ItemCard/ItemCard";
import { GridItems } from "../../components/Home/components/Grid/GridItems";
import { Loader } from "../../components/common/Loader/Loader";
import { addFavoriteItem, fetchActiveItem, removeFavoriteItem } from "../../components/Item/slice/items.slice";
import { ItemCharacteristic } from "../../components/Item/components/ItemCharactiristic/ItemCharacteristic";
import { useMediaQuery } from "usehooks-ts";
import { IItem, IItemsResponse } from "../../components/Item/types";
import { axios } from "../../API/axios";
import { getUserById } from "../../API/utils";
import { IUser } from "../../store/slices/auth/types";
import urls from '../../settings/urls.json'
import Like from "../../components/core-ui/Like/Like";


type Props = {};

export const ItemPage: FC<Props> = (props) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 600px)");

    const { activeItem, itemTypes, favoriteItems } = useAppSelector((state) => state.items);
    const { isAuth } = useAppSelector(state => state.auth)


    const [itemsLikeIt, setItemsLikeIt] = useState<IItem[]>([])
    const [user, setUser] = useState<IUser>({} as IUser)
    const [isFav, setIsFav] = useState<boolean>(false)


    const fetchItemsLikeThis = async (itemTypeId: number) => {
        const { data } = await axios.get<IItemsResponse>('api/item', {
            params: {
                itemTypeId: itemTypeId
            }
        })

        setItemsLikeIt(data.items.filter(item => item.id !== +id!))
    }

    const fetchUser = async (id: number) => {
        setUser({} as IUser)
        const user = await getUserById(id)

        setUser(user)

        console.log(user)
    }

    const profileNavigate = (username: string) => {
        navigate(urls.profile + '/' + username)
    }

    const addToFav = async () => {
        if (isAuth) {
            if (isFav) {
                const success = await dispatch(removeFavoriteItem(+id!))
                if (success) {
                    setIsFav(false)
                }
            } else {
                const success = await dispatch(addFavoriteItem(+id!))
                if (success) {
                    setIsFav(true)
                }
            }
        } else {
            navigate(urls.login)
        }
    }


    useEffect(() => {
        if (id) {
            dispatch(fetchActiveItem(+id));
            window.scrollTo(0, 0);
        }

    }, [id]);

    useEffect(() => {
        if (activeItem) {
            fetchItemsLikeThis(activeItem.itemTypeId)
            fetchUser(activeItem.userId)
        }
    }, [activeItem])

    useEffect(() => {
        if (isAuth) {
            setIsFav(favoriteItems.some(item => item.itemId === +id!))
        }
    }, [favoriteItems])


    if (!user.id || !activeItem) return <Loader/>; // TODO: Пофиксить костыль

    const address = activeItem.address;

    return (
        <div className={styles.item}>
            <div className={styles.itemType}>{itemTypes.find(item => item.id === activeItem.itemTypeId)?.name}</div>
            <div className={styles.body}>
                <div className={styles.content}>
                    <div className={styles.title}>{activeItem.name}</div>
                    <section className={styles.photos}>
                        <div className={styles.photos__bg}>
                            <img
                                src={`${process.env.REACT_APP_API_URL}/api/item/${activeItem.id}/img`}
                                alt=""
                            /></div>
                        <div className={styles.photos__img}>
                            <img
                                src={`${process.env.REACT_APP_API_URL}/api/item/${activeItem.id}/img`}
                                alt=""
                            />
                        </div>
                    </section>
                    {isMobile && (
                        <div className={styles.sidebar}>
                            <Sticky top={20}>
                                <div className={styles.price}>{activeItem.price} $</div>
                                <div className={styles.info}>
                                    <div className={styles.phone}>
                                        <a className={styles.number} href={`tel:${activeItem.tel}`}>
                                            <Button fullwidth size="big" br="br-1">
                                                {activeItem.tel}
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </Sticky>
                        </div>
                    )}
                    <section>
                        <h3>Address</h3>
                        <div className={styles.address}>
                            {address?.region ? `${address?.region}, ` : ""}
                            {address?.city ? `${address?.city}, ` : ""}
                            {address?.street ? `${address?.street}, ` : ""}
                            {address?.house ? `${address?.house}, ` : ""}
                            {address?.area ? `${address?.area}` : ""}
                        </div>
                    </section>
                    <section>
                        <h3>Characteristics</h3>
                        <div className={styles.characteristics}>
                            {activeItem.info?.map((e) => (
                                <ItemCharacteristic
                                    title={e.title}
                                    desc={e.description}
                                    key={e.title}
                                />
                            ))}
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h3>Description</h3>
                        <div> {activeItem.description}</div>
                    </section>
                    {!!itemsLikeIt.length ? <section className={styles.like_it}>
                        <h3>looks like it</h3>
                        <GridItems>
                            {itemsLikeIt.map((item) => <ItemCard key={item.id} {...item} size={'small'}/>)}
                        </GridItems>
                    </section> : <></>}

                </div>
                {!isMobile && (
                    <div className={styles.sidebar}>
                        <Sticky top={20}>
                            <div className={styles.price}>{activeItem.price} $</div>
                            <div className={styles.info}>
                                <div className={styles.phone}>
                                    <a className={styles.number} href={`tel:${activeItem.tel}`}>
                                        <Button fullwidth size="big" br="br-1">
                                            {activeItem.tel}
                                        </Button>
                                    </a>
                                </div>
                                <div className={styles.user} onClick={() => profileNavigate(user.username)}>
                                    <div className={styles.userInfo}>
                                        <div className={styles.username}>
                                            {user.username}
                                        </div>
                                        <div className={styles.userEmail}>
                                            {user.email}
                                        </div>
                                    </div>
                                    <div className={styles.userImg}>
                                        <img src={`${process.env.REACT_APP_API_URL}/static/${user.avatar}`}
                                             alt=""/>
                                    </div>
                                </div>
                                <div className={styles.sidebarButtons}>
                                    <div className={styles.like} onClick={addToFav}>
                                        <Like isActive={isFav}/>
                                    </div>
                                </div>
                            </div>
                        </Sticky>
                    </div>
                )}
            </div>
        </div>
    );
};
