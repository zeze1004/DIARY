import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// set locale as korean
dayjs.locale('ko');

// declare types
export type SimpleDate = {
  year: number;
  month: number;
  date: number;
};
export type Date = dayjs.Dayjs;
export type ChangeListener = (date: Date, simpleDate: SimpleDate) => any;

// change listeners
const onChangeListeners: ChangeListener[] = [];

// date state
let date: Date = dayjs();

export function isToday(date: Date) {
  return date.format('YYMMDD') === dayjs().format('YYMMDD');
}

export function getDate() {
  return date.clone();
}

function getSimpleState() {
  const state = getDate();
  return {
    year: state.year(),
    month: state.month(),
    date: state.date(),
  } as SimpleDate;
}

export function setDate(newDate: number) {
  date = date.date(newDate);
  dispatchChange();
}

export function addMonth() {
  date = date.add(1, 'month').date(1);
  dispatchChange();
}

export function subtractMonth() {
  date = date.subtract(1, 'month');
  date = date.date(date.daysInMonth());
  dispatchChange();
}

export function addOnChangeListener(listener: ChangeListener) {
  onChangeListeners.push(listener);
}

export function dispatchChange() {
  const date = getDate();
  const simpleDate = getSimpleState();
  onChangeListeners.forEach(listener => listener(date, simpleDate));
}

export function simpleDateToDate({ year, month, date}: SimpleDate) {
  return dayjs().year(year).month(month).date(date);
}
