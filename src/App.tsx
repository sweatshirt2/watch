import './App.css'
import Stopwatch from './components/Stopwatch'
import Clock from './components/Clock'
import Calendar from './components/Calendar'

import { UserProvider } from './contexts/UserContext'
import { UsersProvider } from './contexts/UsersContext'
import Home from './Home'

function App() {


  return (
    <UserProvider>
      <UsersProvider>
        <Home />
        <Calendar />
        <Clock />
        <Stopwatch />
      </UsersProvider>
    </UserProvider>
  )
}

export default App
