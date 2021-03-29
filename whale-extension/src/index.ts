import { initCalendar } from './calendar';
import * as DateState from '@state/date';
import * as DiaryState from '@state/diary';
import { getFromStorage, setToStorage } from './storage';

async function test() {
  await setToStorage('test', 'hello, world!');
  await getFromStorage('test');
}

test();

function initView() {
  document.getElementById('btn_save_diary')?.addEventListener('click', function () {
    const title = (document.getElementById('diary_title') as HTMLInputElement).value;
    const content = (document.getElementById('diary_content') as HTMLInputElement).value;
    console.log(title, content);
  });

  // init buttons
  document.getElementById('btn_next')?.addEventListener('click', DateState.addMonth);
  document.getElementById('btn_prev')?.addEventListener('click', DateState.subtractMonth);
  DateState.addOnChangeListener(setDiaryView);
}

function setDiaryView(date: DateState.Date) {
  const isToday: boolean = DateState.isToday(date);
  const diary: DiaryState.Diary = DiaryState.getDiary(date.date());

  const diaryEditorView = document.getElementById('diary_editor_view') as HTMLElement;
  const diaryTitle = document.getElementById('diary_title') as HTMLInputElement;
  const diaryDate = document.getElementById('diary_date') as HTMLElement;
  const diaryContent = document.getElementById('diary_content') as HTMLInputElement;
  const emptyView = document.getElementById('empty_view') as HTMLElement;

  if (diary || isToday) {
    diaryTitle.value = diary?.title || '';
    diaryDate.innerHTML = date.format('YYYY-MM-DD');
    diaryContent.value = diary?.content || '';

    diaryEditorView.classList.remove('d-none');
    emptyView.classList.add('d-none');
  } else {
    diaryEditorView.classList.add('d-none');
    emptyView.classList.remove('d-none');
  }
}

window.onload = function () {
  initView();
  initCalendar();

  DateState.dispatchChange();
}
