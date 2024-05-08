import { createContext, FC, ReactNode, useContext, useState } from "react"

export interface User {
    name: string,
    isLoggedIn: boolean
}

interface UserContext {
    user: User | null,
    logIn: (name: string) => void,
    logOut: () => void
}

const UserContext = createContext<UserContext | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used in the provider");
    }
    return context;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider:FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const logIn = (name: string) => {        
        setUser({name, isLoggedIn: true})
    }
    const logOut = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    )
}

export const users = ['abebe', 'bekele', 'alemu', 'kebede', 'ebsa'];