import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// set locale as korean
dayjs.locale('ko');

// declare type for change listener
type ChangeListener = (dateState: dayjs.Dayjs) => any;

// change listeners
const onChangeListeners: ChangeListener[] = [];

// date state
let dateState = dayjs().date(1);

function getDate() {
  return dateState.clone();
}

function addMonth() {
  dateState = dateState.add(1, 'month');
  dispatchChange();
}

function subtractMonth() {
  dateState = dateState.subtract(1, 'month');
  dispatchChange();
}

function addOnChangeListener(listener: ChangeListener) {
  onChangeListeners.push(listener);
}

function dispatchChange() {
  onChangeListeners.forEach(listener => listener(dateState));
}

export {
  ChangeListener,
  getDate,
  addMonth,
  subtractMonth,
  addOnChangeListener,
}
