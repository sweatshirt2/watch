import { FC, useEffect, useRef, useState } from 'react'

const Stopwatch: FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapses, setElapses] = useState(['']);
  const [ time_run, setTimeRun ] = useState('00:00:00');
  const intervalID:any = useRef(null);

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
    }, 10)}
    return () => clearInterval(intervalID.current);
  
  }, [isRunning])

  function start() {
    setIsRunning(true);
    
  }

  function elapse() {
    setElapses([...elapses, time_run])
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    stop();
    setTimeRun('00:00:00');
    setElapses(['']);
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      <h1>{time_run}</h1>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={elapse}>Ellapse</button>
        <button onClick={reset}>Reset</button>
      </div>
      {
        elapses.map(elapse => (
          <h2> {elapse} </h2>
        ))
      }
    </div>
  )
}

export default Stopwatch;