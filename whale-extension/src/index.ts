import { initCalendar } from './calendar';
import { addMonth, addOnChangeListener, Date, dispatchChange, getDate, isToday, subtractMonth } from './state/date';
import { Diary, getDiary, setDiary } from './state/diary';

function initView() {
  document.getElementById('btn_save_diary')?.addEventListener('click', function () {
    const title = (document.getElementById('diary_title') as HTMLInputElement).value;
    const content = (document.getElementById('diary_content') as HTMLInputElement).value;

    setDiary(getDate(), {
      date: getDate().format('YYYY-MM-DD'),
      title,
      content,
      feelings: Math.floor(Math.random() * 4),
    });
  });

  // init buttons
  document.getElementById('btn_next')?.addEventListener('click', addMonth);
  document.getElementById('btn_prev')?.addEventListener('click', subtractMonth);
  addOnChangeListener(setDiaryView);
}

async function setDiaryView(date: Date) {
  const diary: Diary = await getDiary(date);
  const diaryEditable = isToday(date);

  const btnSaveDiary = document.getElementById('btn_save_diary') as HTMLInputElement;
  const diaryEditorView = document.getElementById('diary_editor_view') as HTMLElement;
  const diaryTitle = document.getElementById('diary_title') as HTMLInputElement;
  const footer = document.getElementById('footer') as HTMLElement;
  const diaryContent = document.getElementById('diary_content') as HTMLInputElement;
  const emptyView = document.getElementById('empty_view') as HTMLElement;

  diaryTitle.value = diary?.title || '';
  diaryContent.value = diary?.content || '';
  footer.innerHTML = date.format('YYYY-MM-DD');

  btnSaveDiary.disabled = diaryTitle.disabled = diaryContent.disabled = !diaryEditable;

  // show/hide editor
  if (!diary && !diaryEditable) {
    // no diary
    diaryEditorView.classList.add('d-none');
    emptyView.classList.remove('d-none');
  } else {
    diaryEditorView.classList.remove('d-none');
    emptyView.classList.add('d-none');
  }
}

window.onload = function () {
  initView();
  initCalendar();

  dispatchChange();
};
