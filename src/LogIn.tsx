import { FC, useState } from "react";
import { useUser } from "./contexts/UserContext";
import { useUsers } from "./contexts/UsersContext";

const LogIn:FC = () => {
    const [name, setName] = useState('');
    const { logIn } = useUser();
    const { users, signUp } = useUsers();

    const handleUser = () => {
        if (users !== null) {
            if (name.trim() !== '') {
                users.forEach(user => {
                    if (JSON.stringify(user) === JSON.stringify({name, isLoggedIn: false})) {
                        logIn(name);
                        return;
                    }
                });
                
                // error message for user not found
            } else {
                console.log('enter a valid name');
            }
        }
    }

    const handleSignUp = () => {
        if (users !== null) {
            if (name.trim() !== '') {
                signUp(name);
                handleUser();
            } else {
                console.log('enter a valid name');
            }
        }
    }

    return (
        <div>
            <input type="text" value={name} onChange={(e) => {
                setName(e.target.value)
            }} placeholder="Username" />
            <button onClick={handleUser}>Log In</button>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}

export default LogIn;