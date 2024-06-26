import { FC, useEffect, useRef, useState } from 'react'
import '../index.css'
import { useUser } from '../contexts/UserContext';

const Stopwatch: FC = () => {
  const [mssg, setMssg] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [elapses, setElapses] = useState(['']);
  const [ time_run, setTimeRun ] = useState('00:00:00');
  const intervalID: any = useRef();
  const total_elapse: any = useRef(3);

  const { user } = useUser();

  useEffect(() => {
    let millis = parseInt(time_run.slice(6));
    let seconds = parseInt(time_run.slice(3,5));
    let minutes = parseInt(time_run.slice(0,2));
    
    if (isRunning) {
      intervalID.current = setInterval(() => {
        millis += 1
        // setMillis((prev) => prev + 1);
        if (millis === 100) {
          // setMillis(0);
          millis = 0
          seconds += 1;
        }
        if (seconds === 60) {
          seconds = 0;
          minutes += 1;
        }
        if (minutes === 60) {
          minutes = 0;
        }
        const mills: string = millis < 10 ? '0'+ millis: ''+ millis;
        const secs: string = seconds < 10 ? '0'+ seconds: ''+ seconds;
        const mins: string = minutes < 10 ? '0'+ minutes: ''+ minutes;

        setTimeRun(mins +':'+ secs + ':' + mills);
    }, 8)} // updated from 10 millis to 8 bacause of processor delay
    
    return () => clearInterval(intervalID.current);
  
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    setHasStarted(true);
    setMssg('');
  }

  function elapse() {
    if (!isRunning) {
      setMssg('Stopwatch not running');
      return;
    }
    if (user || (total_elapse.current > 0)) {
      total_elapse.current -= 1;
      setMssg('');
      setElapses([...elapses, time_run]);
    } else {
      setMssg('Please log in to use this feature more than three times');
    }
  }

  function stop() {
    setMssg('');
    setIsRunning(false);
  }

  function reset() {
    total_elapse.current = 3
    stop();
    setHasStarted(false);
    setTimeRun('00:00:00');
    setElapses(['']);
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      <h2>{time_run}</h2>
      <div>
        { isRunning || <button onClick={start}>Start</button> }
        { isRunning && <button onClick={stop}>Stop</button> }
        { isRunning && <button onClick={elapse}>Ellapse</button>}
        { hasStarted && <button onClick={reset}>Reset</button> }
      </div>
      <p>{mssg}</p>
      {
        elapses.map((elapse, i) => (
          <h4 key={`stopwatch-button${i}`}> {elapse} </h4>
        ))
      }
    </div>
  )
}

export default Stopwatch;