import { SimpleDate } from "@state/date";
import { Diary } from "@state/diary";

export async function getDiary(date: SimpleDate): Promise<Diary> {
  console.log(`getDiary(${date.year}, ${date.month})`);

  const diary = {
    unixTimestamp: Number(new Date()),
    title: 'test',
    content: 'test',
    feelings: Math.floor(Math.random() * 4) % 4,
  }

  return diary;
}

export function createDiary() {
  return;
}

export function updateDiary() {
  return;
}

export function deleteDiary() {
  return;
}

export function getRandomDiary() {
  return;
}
