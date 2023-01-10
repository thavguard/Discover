import { FC, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Profile } from "../../components/Profile/Profile";
import { getUserByUsername } from "../../API/utils";
import { IUser } from "../../store/slices/auth/types";
import { Loader } from "../../components/common/Loader/Loader";

const OtherProfile: FC = () => {
    const { username } = useParams()
    const [user, setUser] = useState<IUser>({} as IUser)

    const fetchUser = async (username: string) => {
        setUser({} as IUser)
        const user = await getUserByUsername(username)
        setUser(user)
    }


    useEffect(() => {
        if (username) {
            fetchUser(username)
        }
    }, [username])

    if (!user.id) return <Loader/>

    return <Profile user={user} isOtherProfile={true}/>
};

export default OtherProfile;
