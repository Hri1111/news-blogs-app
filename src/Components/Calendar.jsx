import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6)); // Default: July 2025

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const startDay = new Date(year, month, 1).getDay(); // 0 = Sun

  const calendarDays = [];

  // 1. Previous month's ending days (faded)
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false
    });
  }

  // 2. Current month days
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true
    });
  }

  // 3. Determine how many total cells are needed: 35 (5 weeks) or 42 (6 weeks)
  const totalCells = calendarDays.length <= 35 ? 35 : 42;

  // 4. Next month's beginning days (faded)
  const nextMonthDays = totalCells - calendarDays.length;
  for (let i = 1; i <= nextMonthDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false
    });
  }

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <div className='calendar'>
      <div className="navigate-date">
        <h2 className="month">{monthNames[month]}</h2>
        <h2 className="year">{year}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={handlePrevMonth}></i>
          <i className="bx bx-chevron-right" onClick={handleNextMonth}></i>
        </div>
      </div>

      <div className="weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      <div className="days">
        {calendarDays.map((dateObj, index) => {
          const isToday =
            dateObj.day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear() &&
            dateObj.isCurrentMonth;

          return (
            <span
              key={index}
              className={`day ${isToday ? 'today' : ''} ${!dateObj.isCurrentMonth ? 'faded' : ''}`}
            >
              {dateObj.day}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
