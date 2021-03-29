import * as DateState from "@state/date";
import * as DiaryState from "@state/diary";

async function getDiary({ year, month }: { year: number, month: number }): Promise<DiaryState.Diary[]> {
  console.log(`getDiary(${year}, ${month})`);

  const daysInMonth = DateState.getState().daysInMonth();
  const diaries = Array(daysInMonth).fill(null).map((_, i) => ({
      unixTimestamp: Number(new Date()),
      title: 'test',
      content: 'test',
      feelings: i % 4,
    } as DiaryState.Diary));

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
