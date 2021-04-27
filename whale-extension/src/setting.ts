import LocalStorage from '@localStorage/index';

function initNumberInput(id: string, init: number, setting: string, min: number, max: number) {
  const e = document.getElementById(id) as HTMLInputElement;
  e.value = init.toString();
  e.addEventListener('change', () => {
    e.value = Math.max(min, Math.min(max, Number(e.value))).toString();
    LocalStorage.setAlarmSetting({
      [setting]: Number(e.value),
    });
  });
}

export function initSetting() {
  const alarmSetting = LocalStorage.getAlarmSetting();

  const checkboxAlarm = document.getElementById('checkbox_alarm') as HTMLInputElement;
  const checkboxAlarmOption = document.getElementById('checkbox_alarm_option') as HTMLElement;
  checkboxAlarm.checked = alarmSetting.on;
  checkboxAlarmOption.hidden = !alarmSetting.on;
  checkboxAlarm.addEventListener('change', () => {
    LocalStorage.setAlarmSetting({
      on: checkboxAlarm.checked,
    });
    checkboxAlarmOption.hidden = !checkboxAlarm.checked;
  });

  initNumberInput('checkbox_alarm_hour', alarmSetting.hourToAlarm, 'hourToAlarm', 0, 23);
  initNumberInput('checkbox_alarm_minute', alarmSetting.minuteToAlarm, 'minuteToAlarm', 0, 59);
  initNumberInput('checkbox_alarm_repeat_period', alarmSetting.periodInMinutes, 'periodInMinutes', 1, 60);
  initNumberInput('checkbox_alarm_repeat_number', alarmSetting.repeat, 'repeat', 1, 10);
}
