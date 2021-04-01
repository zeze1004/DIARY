import LocalStorage from "@/localStorage/diary";
import API from "@api/diary";
import { Date } from "./date";

export interface Diary {
  /** YYMMDD */
  date: string;
  content: string;
  /** 0 ~ 3 */
  feeling: number;
}

// declare types
// type ChangeListener = (diaries: Diary[]) => any;

// change listeners
// const onChangeListeners: ChangeListener[] = [];

export async function getDiary(date: Date) {
  const diaryFromAPI = await API.getDiary(date);
  const diaryFromLocalStorage = await LocalStorage.getDiary(date);
  return diaryFromLocalStorage;
}

export async function setDiary(date: Date, diary: Diary) {
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
