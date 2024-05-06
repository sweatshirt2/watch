import { useState, FC, useEffect } from "react"

const Calendar:FC = () => {

  const date = new Date();
  const [month, setMonth] = useState(date.getMonth());
  const [empty_days, setEmptyDays] = useState(['']);
  const months= ['jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const days: number[] = [];

  let i = 1;
  while (i < 31) {
    days.push(i++);
  }

  function updateEmptyDays(current_start: number) {
    const new_empty_days = [];
    for (let index = 0; index < current_start; index++) {
      new_empty_days.push('');
    }
    setEmptyDays(new_empty_days);
  }
  
    return (
        <div className="calendar">
          <dfn></dfn>
          <button className="swipe-month-btn" onClick={()=>{
            updateEmptyDays(((month - 2) * 30) % 7);
            setMonth(prev => prev - 1);
            }}>{'<'}</button>
          <div className="calendar-container">
            <header className="calendar-month"><h5>{months[month - 1]}</h5></header>
            <div className="calendar-days">
              <div>mon</div><div>tue</div><div>wed</div><div>thu</div><div>fri</div><div>sat</div><div>sun</div>
              {
                empty_days.map((day, i) => (
                  <div key={`empty-div${i}`}>
                    {day}
                  </div>
              ))
              }
              {
                days.map((day, i) => (
                  <div key={`day${i}`}>
                    {(date.getDay() == day && date.getMonth() == month) ? <div id="today">{day}</div> : day}
                  </div>
                ))
              }
            </div>
          </div>
          <button className="swipe-month-btn" onClick={()=>{
            updateEmptyDays(((month) * 30) % 7);
            setMonth(prev => prev + 1);
            }}>{'>'}</button>
        </div>
    )
}

export default Calendar;