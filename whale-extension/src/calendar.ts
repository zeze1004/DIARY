import { getDiary } from '@state/diary';
import { addOnChangeListener, ChangeListener, getToday, isThisMonth, setDate, simpleDateToDate } from './state/date';

const emptyCells: HTMLElement[] = [];
const dateCells: HTMLElement[] = [];

// create a new cell
function createCell(date?: number): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = date ? `
    <div class="calendar_cell" data-date="${date}">
      <span class="date">${date}</span>
      <span class="dot"></span>
    </div>`
    :
    `<div class="calendar_cell"></div>`;
  return template.content.firstElementChild as HTMLElement;
}

// create cells and append to the calendar
function initCalendarBody() {
  const calendarBodyElement = document.getElementById('calendar_body') as HTMLElement;

  // append empty cells
  for (let i = 0; i < 6; i++) {
    const cell = createCell();
    emptyCells.push(cell);
    calendarBodyElement.appendChild(cell);
  }

  // append date cells
  for (let i = 1; i <= 31; i++) {
    const cell = createCell(i);
    dateCells.push(cell);
    cell.addEventListener('click', onClickCell);
    calendarBodyElement.appendChild(cell);
  }
}

// update the calendar
const updateCalendar: ChangeListener = async date => {
  const year = date.year();
  const month = date.month(); // 0 ~ 11
  const daysInMonth = date.daysInMonth();
  const day = date.date(1).day(); // 0(Sun) ~ 6(Sat)
  const today = getToday();

  // show/hide empty cells
  emptyCells.map((cell, index) => {
    cell.dataset.visible = String(index < day);
  });

  // show/hide date cells
  dateCells.map((cell, index) => {
    delete cell.dataset.selected;
    delete cell.dataset.today;
    cell.dataset.visible = String(index < daysInMonth);
  });
  dateCells[date.date() - 1].dataset.selected = "true";

  // show today
  if (isThisMonth(date)) {
    dateCells[today.date() - 1].dataset.today = "true";
  }

  // update title
  const calendarTitleYearElement = document.getElementById('calendar_title_year') as HTMLElement;
  calendarTitleYearElement.innerHTML = date.format('YYYY');
  const calendarTitleMonthElement = document.getElementById('calendar_title_month') as HTMLElement;
  calendarTitleMonthElement.innerHTML = date.format('MMMM');

  const diaries = await Promise.all(
    Array(daysInMonth).fill(null).map((_, i) => getDiary(simpleDateToDate({ year, month, date: i + 1 })))
  );
  dateCells.slice(0, diaries.length).map((cell, index) => {
    cell.dataset.emotion = diaries[index]?.emotion;
  });
};

function onClickCell(this: HTMLElement) {
  setDate(Number(this.dataset.date));
}

// init the calendar
export function initCalendar() {
  initCalendarBody();
  addOnChangeListener(updateCalendar);
}
