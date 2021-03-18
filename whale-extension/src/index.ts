import { initCalendar } from './calendar';
import { getFromStorage, setToStorage } from './storage';

async function test() {
  await setToStorage('test', 'hello, world!');
  await getFromStorage('test');
}

test();

function initEditor() {
  const editor = document.getElementById('editor');
  document.getElementById('btn_toggle_editor')?.addEventListener('click', function (e) {
    this.classList.toggle('rotate');
    editor?.classList.toggle('show');
  });
}

window.onload = function () {
  initCalendar();
  initEditor();
}
