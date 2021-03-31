import { Date } from "@state/date";
import { Diary } from "@state/diary";

async function getDiary(date: Date): Promise<Diary> {
  const formatted = date.format('YYYY-MM-DD');
  console.log(`getDiary(${formatted})`);

  const diary = {
    date: formatted,
    title: 'test',
    content: 'test',
    feeling: Math.floor(Math.random() * 4) % 4,
  };

  return diary;
}

function createDiary() {
  return;
}

function updateDiary() {
  return;
}

function deleteDiary() {
  return;
}

function getRandomDiary() {
  return;
}

export default {
  getDiary,
  createDiary,
  updateDiary,
  deleteDiary,
  getRandomDiary,
};
