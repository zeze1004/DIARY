import React, { useState } from 'react';

import styled from 'styled-components';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { useHistory } from 'react-router-dom';

import {
  format,
  addDays,
  addMonths,
  getYear,
  getMonth,
  getDate,
  getWeeksInMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 800px;
  justify-content: center;
  align-items: center;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100.3%;
  height: 100px;
  background-color: #264653;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  button {
    cursor: pointer;
    outline: none;
    background: transparent;
    border: none;
    font-size: 50px;
    padding: 30px;
    color: #E4D097;
  }
  .showingMonthAndYear_box {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    width: 300px;
    height: 80px;
    color: #E4D097;
  }
`;

const CalendarBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  border: 1px solid #081752;
  .sevenDays_box {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 6%;
  }
  .dayOfWeek_box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 7);
    font-size: 16px;
    font-weight: bold;
    background-color: #E4D097;
    &:first-child {
      color: red;
    }
    &:last-child {
      color: royalblue;
    }
  }
  .month_box {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .week_box {
    display: flex;
    height: calc(100% / 6);
  }
  .date_box {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% /7);
    border-radius: 50%;
    margin: 10px;
    font-size: 30px;
    color: black;
    &:hover {
      background-color: #081752;
      color: #f0f2f5;
    }
    &.different_month {
      color: rgba(0, 0, 0, 0.3);
    }
    &.same_day {
      border-radius :30%;
      background-color: #E4D097;
      &:hover {
        border-radius: 50%;
        background-color: #081752;
        color: #f0f2f5;
      }
    }
  }
`;

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const history = useHistory();

  const sevenDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  const showingYearInHeader = getYear(date);
  const showingMonthInHeader = getMonth(date);
  const weeksInHeaderMonth = getWeeksInMonth(date);

  const dateRange = Array(7).fill(1);
  const weekRagne = Array(weeksInHeaderMonth).fill(1);

  const addMonth = () => {
    const changedDate = addMonths(date, 1);

    const nextYear = getYear(changedDate);
    const nextMonth = getMonth(changedDate);

    setDate(new Date(nextYear, nextMonth));
  };

  const minusMonth = () => {
    const changedDate = subMonths(date, 1);

    const previousYear = getYear(changedDate);
    const previousMonth = getMonth(changedDate);

    setDate(new Date(previousYear, previousMonth));
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <button onClick={minusMonth}><MdChevronLeft /></button>
        <div className='showingMonthAndYear_box'>
          {format(date, 'MMMM yyyy')}
        </div>
        <button onClick={addMonth}>
          <MdChevronRight />
        </button>
      </CalendarHeader>
      <CalendarBody>
        <div className='sevenDays_box'>
          {
            sevenDays.map(item => {
              return (
                <div className='dayOfWeek_box' key={item}>
                  <span className='text'>{item}</span>
                </div>
              );
            })
          }
        </div>
        <div className='month_box'>
          {
            weekRagne.map((week, nthWeek) => {
              return (
                <div className='week_box' key={nthWeek}>
                  {
                    dateRange.map((date, dateIndex) => {
                      let increasingDays = nthWeek * 7 + dateIndex;
                      let nextDate = addDays(startOfWeek(new Date(showingYearInHeader, showingMonthInHeader)), increasingDays);
                      let processedDate = format(nextDate, 'd');
                      let currentMonth = getMonth(nextDate);
                      let currentYear = getYear(nextDate);
                      let showingDate = showingMonthInHeader === currentMonth ? `${processedDate}` : '';

                      let todayYear = getYear(new Date());
                      let todayMonth = getMonth(new Date());
                      let todayDate = getDate(new Date());
                      let todaySelector = format(nextDate, 'yyyy-MM-d') === format(new Date(todayYear, todayMonth, todayDate), 'yyyy-MM-d') ? 'same_day' : '';

                      return (
                        <div
                          className={`date_box ${todaySelector}`}
                          key={dateIndex}
                          onClick={() => {
                            history.push({
                              pathname: `/detail`,
                              state: {
                                year: currentYear,
                                month: currentMonth + 1,
                                date: processedDate
                              }
                            });
                          }}
                        >
                          <span className='text'>{showingDate}</span>
                        </div>
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </CalendarBody>
    </CalendarWrapper>
  );
};

export default Calendar;