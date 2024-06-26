import { useState, useEffect, FC } from "react"

const Calendar:FC = () => {

  const date = new Date();
  const [month, setMonth] = useState(date.getMonth());
  const [empty_days, setEmptyDays] = useState([30]);
  const [end_days, setEndDays] = useState([0]);
  const months = ['jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  let newdays: number[] = [];
  let dir = 'none';
  
  const [days, setDays] = useState(newdays);
  let countmonth = month;

  useEffect(() => {
    switch (dir) {
      case 'prev':
        countmonth -= 1;
        break;
      case 'next':
        countmonth += 1;
        break;
      default:
        break;
    }
    
    const thisend = new Date(date.getFullYear(), countmonth, 0).getDate();
    const lastend = new Date(date.getFullYear(), countmonth - 1, 0).getDate();
    const firstday = new Date(date.getFullYear(), countmonth, 1).getDay();

    let new_empty_days: number[] = [];
    newdays = [];
    let i = 1;

    while (i <= new Date(date.getFullYear(), countmonth, 0).getDate()) {
      newdays.push(i++);
    }
    setDays(newdays);
    
    for (let i = 1; i < firstday; i++) {
      new_empty_days.push(lastend - firstday + i + 1);
    }
    setEmptyDays(new_empty_days);
    const len = new_empty_days.length;
    new_empty_days = [];

    const cells = (len + thisend) > 35 ? 42 : 35;
    for (let i = 1; i <= (cells - (len + thisend)); i++) {
      new_empty_days.push(i);
    }

    setEndDays(new_empty_days);  
    return () => {
      
    }
  }, [month])


  return (
        <div className="calendar">
          <dfn></dfn>
          <button className="swipe-month-btn" onClick={ () => {
            dir = 'prev';
            setMonth(prev => prev - 1);
            }}>{'<'}</button>
          <div className="calendar-container">
            <header className="calendar-month"><h5>{months[month - 1]}</h5></header>
            <div className="calendar-days">
              <div>mon</div><div>tue</div><div>wed</div><div>thu</div><div>fri</div><div>sat</div><div>sun</div>
              {
                empty_days.map((day, i) => (
                  <div key={`empty-div${i}`} className="empty-day">
                    { day }
                  </div>
              ))
              }
              {
                days.map((day, i) => (
                  <div key={`day${i}`}>
                    {
                      (date.getDate() == day && date.getMonth() == month) ? <div id="today">{day}</div> : day                      
                    }
                  </div>
                ))
              }
              {
                end_days.map((day, i) => (
                  <div key={`end-div${i}`} className="empty-day">
                    { day }
                  </div>
              ))
              }
            </div>
          </div>
          <button className="swipe-month-btn" onClick={ () => {
            dir = 'next';
            setMonth(prev => prev + 1);
            }}>{'>'}</button>
        </div>
    )
}

export default Calendar;