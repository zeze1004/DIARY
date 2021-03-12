import * as DateState from './date';

const emptyCells: HTMLElement[] = [];
const dateCells: HTMLElement[] = [];

// create a new cell
function createCell(date?: number): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = `<div class="calendar_cell">${date ? date : '&nbsp;'}</div>`;
  return template.content.firstElementChild as HTMLElement;
}

// init buttons
function initCalendarButtons() {
  document.getElementById('btn_next')?.addEventListener('click', DateState.addMonth);
  document.getElementById('btn_prev')?.addEventListener('click', DateState.subtractMonth);
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
    calendarBodyElement.appendChild(cell);
  }
}

// update the calendar
const updateCalendar: DateState.ChangeListener = state => {
  const year = state.year();
  const month = state.month(); // 0 ~ 11
  const date = state.date(); // 1 ~ 31
  const daysInMonth = state.daysInMonth();
  const day = state.day(); // 0(Sun) ~ 6(Sat)

  // show/hide empty cells
  emptyCells.map((cell, index) => {
    cell.dataset.visible = String(index < day);
  });

  // show/hide date cells
  dateCells.map((cell, index) => {
    cell.dataset.visible = String(index < daysInMonth);
  });

  // update title
  const calendarTitleElement = document.getElementById('calendar_title') as HTMLElement;
  calendarTitleElement.innerHTML = state.format('MMMM YYYY');
}

// init the calendar
window.onload = function () {
  initCalendarButtons();
  initCalendarBody();
  DateState.addOnChangeListener(updateCalendar);
  updateCalendar(DateState.getDate());
}
