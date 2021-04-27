import { getToday } from '@state/date';
import LocalStorage from '@localStorage/index';

const ALARM_NAME = 'ALARM_NAME';

const getWhen = (hourToAlarm: number, minuteToAlarm: number) =>
  getToday().hour(hourToAlarm).minute(minuteToAlarm).second(0).millisecond(0).valueOf();

function clearAlarm() {
  chrome.alarms.clear(ALARM_NAME);
}

function doAlarm() {
  const setting = LocalStorage.getAlarmSetting();
  const { on, hourToAlarm, minuteToAlarm, lastAlarm, repeat } = setting;
  let { nRepeated } = setting;
  const when = getWhen(hourToAlarm, minuteToAlarm);
  const now = getToday().valueOf();

  // end: alarm off
  if (!on) return;

  // end: not yet
  if (now < when) return;

  // reset repeat
  if (lastAlarm < when) {
    nRepeated = 0;
  }

  // end: no more repeat
  if (nRepeated >= repeat) return;

  LocalStorage.setAlarmSetting({
    lastAlarm: now.valueOf(),
    nRepeated: nRepeated + 1,
  });
  chrome.notifications.create(ALARM_NAME, {
    eventTime: Date.now() + 1000,
    iconUrl: './img/tempIcon.png',
    message: '일기를 남겨주세요',
    requireInteraction: true,
    title: 'DIARY',
    type: 'basic',
  });
}

function initAlarm() {
  const { on, hourToAlarm, minuteToAlarm, periodInMinutes } = LocalStorage.getAlarmSetting();
  const when = getWhen(hourToAlarm, minuteToAlarm);

  clearAlarm();
  if (chrome.alarms.onAlarm.hasListener(doAlarm))
    chrome.alarms.onAlarm.removeListener(doAlarm);

  if (!on) return;

  chrome.alarms.onAlarm.addListener(doAlarm);
  chrome.alarms.create(ALARM_NAME, {
    when,
    periodInMinutes,
  });
}

initAlarm();
