import { useEffect, useRef, useState } from 'react'
import './App.css'
import Stopwatch from './components/Stopwatch'
function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapses, setElapses] = useState([]);
  const intervalID = useRef(0)
  const startTime = useRef(0)

  useEffect(() => {

  }, [isRunning])

  function start() {}
  function ellapse() {}
  function stop() {}
  function reset() {}

  return (
    <>
      <Stopwatch />
    </>
  )
}

export default App
