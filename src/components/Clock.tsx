import { FC, useEffect, useRef, useState } from 'react'
import '../index.css'
const Clock: FC = () => {
  const [current_time, setCurrentTime] = useState('');
  const [hourformat12, setHourFormat12] = useState(true);
  const intervalID: any = useRef();

  function changeFormat() {
    setHourFormat12((prev) => !prev);
  }

  useEffect(() => {
    intervalID.current = setInterval(() => {
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const seconds = date.getSeconds();
            
      let hr = hour > 9? hour + '': '0' + hour;
      const min = minute > 9? minute + '': '0' + minute;
      const sec = seconds > 9? seconds + '': '0' + seconds;
            
      if (hourformat12) {
        if (parseInt(hr) > 11) {
          hr = parseInt(hr) - 12 + '';
          setCurrentTime(hr + ':' + min + ':' + sec + ' PM');
        } else {
          setCurrentTime(hr + ':' + min + ':' + sec + ' AM');
        }
      } else {
        setCurrentTime(hr + ':' + min + ':' + sec);
      }
            
    }, 100);

    return (() => {
      clearInterval(intervalID.current);
    });
  }, [current_time, hourformat12]);
  return (
    <div>
      <h1>Clock</h1>
      <h2>{current_time}</h2>
      <button onClick={changeFormat}>{hourformat12 ? 12 : 24} HR Format</button>
    </div>
    )
}

export default Clock;