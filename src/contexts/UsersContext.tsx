import { createContext, FC, ReactNode, useContext, useState } from "react";
import { User, useUser } from "./UserContext";

interface UsersContext {
    users: User[] | null,
    signUp: (name: string) => void 
}

interface UsersProviderProps {
    children: ReactNode
}

const UsersContext = createContext<UsersContext | null>(null);

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("useUser must be used in the provider");
    }
    return context;
}

export const UsersProvider:FC<UsersProviderProps> = ({children}) => {
    const { logIn } = useUser();

    const [users, setUsers] = useState<User[]>([
        {name: 'abebe', isLoggedIn: false},
        {name: 'bekele', isLoggedIn: false},
        {name: 'alemu', isLoggedIn: false},
        {name: 'kebede', isLoggedIn: false},
        {name: 'ebsa', isLoggedIn: false}
    ]);
    
    const signUp = (name: string) => {

        const total_users = [...users, {name, isLoggedIn: false}]    
        setUsers([...total_users]);
        console.log('done');
        console.log(users);
        logIn(name);
    }

    return (
        <UsersContext.Provider value={{ users, signUp }}>
            {children}
        </UsersContext.Provider>
    )
}