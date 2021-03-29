import { SimpleDate } from '@state/date';
import { Diary } from '@state/diary';

function diaryStateToKey({ year, month, date }: SimpleDate) {
  return `${year}-${month}-${date}`;
}

export function getDiary(date: SimpleDate) {
  const diaries = localStorage.getItem(diaryStateToKey(date));
  return diaries ? JSON.parse(diaries) : [];
}

export function setDiary(date: SimpleDate, diary: Diary) {
  const data = JSON.stringify(JSON.stringify(diary));
  localStorage.setItem(diaryStateToKey(date), data);
}

export default {
  getDiary,
  setDiary,
};
