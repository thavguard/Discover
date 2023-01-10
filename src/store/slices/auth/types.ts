export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface AuthSlice {
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    isInitDone: boolean
    error: string
}

export interface IRegistration {
    email: string;
    password: string;
    username: string;
    avatar: string;
}


export interface IUser {
    email: string;
    id: number;
    username: string;
    isActivated: boolean;
    avatar: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

