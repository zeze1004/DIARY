import { Date } from "@state/date";
import { Diary } from "@state/diary";
import { API, requestAPI } from ".";

async function getDiary(date: Date): Promise<Diary> {
  const diary = await requestAPI(API.GET_DIARY, null, date);
  return diary;
}

async function getAllDiaries(): Promise<Diary[]> {
  const diaries = await requestAPI(API.GET_ALL_DIARIES);
  return diaries;
}

async function createDiary(diary: Diary): Promise<void> {
  await requestAPI(API.CREATE_DIARY, diary);
}

async function updateDiary(diary: Diary): Promise<void> {
  await requestAPI(API.UPDATE_DIARY, diary);
}

async function getRandomDiary() {
  const diary = await requestAPI(API.GET_RANDOM_DIARY);
  return diary;
}

export default {
  getDiary,
  getAllDiaries,
  createDiary,
  updateDiary,
  getRandomDiary,
};
