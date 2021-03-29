import API from "@api/diary";
import LocalStorage from '@localStorage/diary';
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

async function getDiary(date: DateState.SimpleDate) {
  const diaryFromAPI = await API.getDiary(date);
  const diaryFromLocalStorage = await LocalStorage.getDiary(date);
  return diaryFromLocalStorage;
}

async function setDiary(date: DateState.SimpleDate, diary: Diary) {
  await LocalStorage.setDiary(date, diary);
  // 
  // dispatchChange();
}

// function addOnChangeListener(listener: ChangeListener) {
//   onChangeListeners.push(listener);
// }

// function dispatchChange() {
//   const clone = JSON.parse(JSON.stringify(diaries));
//   onChangeListeners.forEach(listener => listener(clone));
// }

export {
  Diary,
  ChangeListener,
  getDiary,
  setDiary,
  // addOnChangeListener,
  // dispatchChange,
}
