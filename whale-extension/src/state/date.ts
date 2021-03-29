import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// set locale as korean
dayjs.locale('ko');

// declare types
type SimpleDate = {
  year: number;
  month: number;
  date: number;
};
type Date = dayjs.Dayjs;
type ChangeListener = (date: Date, simpleDate: SimpleDate) => any;

// change listeners
const onChangeListeners: ChangeListener[] = [];

// date state
let date: Date = dayjs();

function isToday(date: Date) {
  console.log(date.format('YYYYMMDD'));
  console.log(dayjs().format('YYYYMMDD'));
  return date.format('YYYYMMDD') === dayjs().format('YYYYMMDD');
}

function getState() {
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

function setDate(newDate: number) {
  date = date.date(newDate);
  dispatchChange();
}

function addMonth() {
  date = date.add(1, 'month');
  dispatchChange();
}

function subtractMonth() {
  date = date.subtract(1, 'month');
  dispatchChange();
}

function addOnChangeListener(listener: ChangeListener) {
  onChangeListeners.push(listener);
}

function dispatchChange() {
  const date = getState();
  const simpleDate = getSimpleState();
  onChangeListeners.forEach(listener => listener(date, simpleDate));
}

export {
  SimpleDate,
  Date,
  ChangeListener,
  isToday,
  getState,
  setDate,
  addMonth,
  subtractMonth,
  addOnChangeListener,
  dispatchChange,
}
