import API from "@api/diary";
import LocalStorage from '@localStorage/diary';
import { SimpleDate } from "./date";

export interface Diary {
  unixTimestamp: number;
  title: string;
  content: string;
  /** 0 ~ 3 */
  feelings: number;
}

// declare types
// type ChangeListener = (diaries: Diary[]) => any;

// change listeners
// const onChangeListeners: ChangeListener[] = [];

export async function getDiary(date: SimpleDate) {
  const diaryFromAPI = await API.getDiary(date);
  const diaryFromLocalStorage = await LocalStorage.getDiary(date);
  return diaryFromLocalStorage;
}

export async function setDiary(date: SimpleDate, diary: Diary) {
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

export default {
  // ChangeListener,
  getDiary,
  setDiary,
  // addOnChangeListener,
  // dispatchChange,
}
