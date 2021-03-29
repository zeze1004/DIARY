import { Date } from '@state/date';
import { Diary } from '@state/diary';

function diaryStateToKey(date: Date) {
  return date.format('YYYY-MM-DD');
}

function getDiary(date: Date) {
  const diary = localStorage.getItem(diaryStateToKey(date));
  return diary ? JSON.parse(diary) : null;
}

function setDiary(date: Date, diary: Diary) {
  const data = JSON.stringify(diary);
  localStorage.setItem(diaryStateToKey(date), data);
}

export default {
  getDiary,
  setDiary,
};
