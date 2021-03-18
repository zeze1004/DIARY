import { getDate } from "../date";

interface Diary {
  unixTimestamp: number;
  title: string;
  content: string;
  /** 0 ~ 3 */
  feelings: number;
}

async function getDiary({ year, month }: { year: number, month: number }) {
  console.log(`getDiary(${year}, ${month})`);

  const daysInMonth = getDate().daysInMonth();
  const diaries = Array(daysInMonth).fill(null).map((_, i) => ({
      unixTimestamp: Number(new Date()),
      title: 'test',
      content: 'test',
      feelings: i % 4,
    } as Diary));

  return diaries;
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

export {
  getDiary,
  createDiary,
  updateDiary,
  deleteDiary,
  getRandomDiary,
}
