import { initCalendar } from './calendar';
import { addMonth, addOnChangeListener, Date, dispatchChange, getDate, isToday, subtractMonth } from './state/date';
import { Diary, getDiary, setDiary } from './state/diary';

function initView() {
  const btnDiaryFeeling = document.getElementById('btn_diary_emotion') as HTMLElement;
  const btnSaveDiary = document.getElementById('btn_save_diary') as HTMLElement;

  btnSaveDiary.addEventListener('click', function () {
    const contents = (document.getElementById('diary_content') as HTMLInputElement).value;

    setDiary(getDate(), {
      date: getDate().format('YYMMDD'),
      contents,
      emotion: parseInt(btnDiaryFeeling.dataset.emotion || '3'),
    });
  });

  btnDiaryFeeling.addEventListener('click', function () {
    const emotion = parseInt(this.dataset.emotion || '3');
    this.dataset.emotion = String((emotion + 1) % 4);
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
  const btnDiaryFeeling = document.getElementById('btn_diary_emotion') as HTMLInputElement;
  const footer = document.getElementById('footer') as HTMLElement;
  const diaryContent = document.getElementById('diary_content') as HTMLInputElement;
  const emptyView = document.getElementById('empty_view') as HTMLElement;

  btnDiaryFeeling.dataset.emotion = String(diary?.emotion ?? -1);
  diaryContent.value = diary?.contents || '';
  footer.innerHTML = date.format('YYYY-MM-DD');

  btnDiaryFeeling.disabled = btnSaveDiary.disabled = diaryContent.disabled = !diaryEditable;

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
