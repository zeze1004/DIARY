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
  console.log(date.format('YYYYMMDD'));
  console.log(dayjs().format('YYYYMMDD'));
  return date.format('YYYYMMDD') === dayjs().format('YYYYMMDD');
}

export function getState() {
  return date.clone();
}

function getSimpleState() {
  const state = getState();
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
  date = date.add(1, 'month');
  dispatchChange();
}

export function subtractMonth() {
  date = date.subtract(1, 'month');
  dispatchChange();
}

export function addOnChangeListener(listener: ChangeListener) {
  onChangeListeners.push(listener);
}

export function dispatchChange() {
  const date = getState();
  const simpleDate = getSimpleState();
  onChangeListeners.forEach(listener => listener(date, simpleDate));
}

export default {
  isToday,
  getState,
  setDate,
  addMonth,
  subtractMonth,
  addOnChangeListener,
  dispatchChange,
}
