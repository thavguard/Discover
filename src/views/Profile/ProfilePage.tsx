import { FC } from 'react';
import { useAppSelector } from "../../hooks/hooks";
import { Profile } from "../../components/Profile/Profile";

export const ProfilePage: FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    return <Profile user={user}/>

};

