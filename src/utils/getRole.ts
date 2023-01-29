export const getRole = (role: string) => {
    switch (role) {
        case "USER":
            return 'Пользователь'
        case "ADMIN":
            return "Администратор"
    }
}
