import * as API from "../api/diary";
import * as DateState from "./date";

interface Diary {
  unixTimestamp: number;
  title: string;
  content: string;
  /** 0 ~ 3 */
  feelings: number;
}

// declare types
type ChangeListener = (diaries: Diary[]) => any;

// change listeners
const onChangeListeners: ChangeListener[] = [];

// diary state
let diaries: Diary[] = [];

async function loadDiaries(date: DateState.Date) {
  const year = date.year();
  const month = date.month();
  diaries = await API.getDiary({ year, month });
  dispatchChange();
}

/** date: 1 ~ 31 */
function getDiary(date: number) {
  return diaries[date - 1];
}

/** date: 1 ~ 31 */
function setDiary(date: number, diary: Diary) {
  diaries[date - 1] = diary;
  dispatchChange();
}

function addOnChangeListener(listener: ChangeListener) {
  onChangeListeners.push(listener);
}

function dispatchChange() {
  const clone = JSON.parse(JSON.stringify(diaries));
  onChangeListeners.forEach(listener => listener(clone));
}

export {
  Diary,
  ChangeListener,
  loadDiaries,
  getDiary,
  setDiary,
  addOnChangeListener,
  dispatchChange,
}
