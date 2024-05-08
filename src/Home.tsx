import Motto from "./components/Motto";
import { useUser } from "./contexts/UserContext";
import LogIn from "./LogIn";

export default function Home() {
    const { user, logOut } = useUser();
    return (
        <>
            {
                user ? <div>
                    <p id="title"> Welcome, {user.name} </p>
                    <button id="logout" onClick={()=>{
                        logOut();
                    }}>Log Out</button>
                    <Motto />
                </div> : <div>
                    <h3>Welcome</h3>
                    <p>log in to unlock some features</p>
                    <LogIn />
                </div> 
            }
        </>
    )
}