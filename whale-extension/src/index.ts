import { initAccount } from './account';
import { initCalendar } from './calendar';
import { initSetting } from './setting';
import { dispatchChange as dispatchAccountChange } from './state/account';
import { addMonth, addOnChangeListener, Date, dispatchChange as dispatchDateChange, getDate, isToday, subtractMonth } from './state/date';
import { Diary, getDiary, setDiary } from './state/diary';

function initView() {
  const btnSaveDiary = document.getElementById('btn_save_diary') as HTMLElement;
  const optionDiaryEmotion = document.getElementById('option_diary_emotion') as HTMLInputElement;

  const btnOpenSettings = document.getElementById('btn_open_settings') as HTMLElement;
  const btnCloseSettings = document.getElementById('btn_close_settings') as HTMLElement;
  const settingPage = document.getElementById('setting_page') as HTMLElement;

  btnOpenSettings.addEventListener('click', () => { settingPage.hidden = false; });
  btnCloseSettings.addEventListener('click', () => { settingPage.hidden = true; });

  btnSaveDiary.addEventListener('click', function () {
    const contents = (document.getElementById('diary_content') as HTMLInputElement).value;
    const emotion = optionDiaryEmotion.value;

    console.log('save diary', emotion);

    setDiary(getDate(), {
      date: getDate().format('YYMMDD'),
      contents,
      emotion,
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
  const optionDiaryEmotion = document.getElementById('option_diary_emotion') as HTMLInputElement;
  const footer = document.getElementById('footer') as HTMLElement;
  const diaryContent = document.getElementById('diary_content') as HTMLInputElement;
  const emptyView = document.getElementById('empty_view') as HTMLElement;

  optionDiaryEmotion.value = diary?.emotion ?? '-1';
  diaryContent.value = diary?.contents || '';
  footer.innerHTML = date.format('YYYY-MM-DD');

  optionDiaryEmotion.disabled = btnSaveDiary.disabled = diaryContent.disabled = !diaryEditable;

  // show/hide editor
  const showEditor = !diary && !diaryEditable;
  diaryEditorView.hidden = showEditor;
  emptyView.hidden = !showEditor;
}

window.onload = function () {
  initView();
  initCalendar();
  initSetting();
  initAccount();

  dispatchDateChange();
  dispatchAccountChange();
};
