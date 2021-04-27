export type AlarmSetting = {
  on: boolean,
  hourToAlarm: number,
  minuteToAlarm: number,
  lastAlarm: number,
  periodInMinutes: number,
  repeat: number,
  nRepeated: number,
};

const key = 'ALARM_SETTING';
const defaultSetting: AlarmSetting = {
  on: true,
  hourToAlarm: 21,
  minuteToAlarm: 0,
  lastAlarm: 0,
  periodInMinutes: 5,
  repeat: 2,
  nRepeated: 0,
};

function getAlarmSetting(): AlarmSetting {
  const setting = localStorage.getItem(key);
  return setting ? JSON.parse(setting) : defaultSetting;
}

function setAlarmSetting(setting: Partial<AlarmSetting>) {
  const before = getAlarmSetting();
  localStorage.setItem(key, JSON.stringify({
    ...before,
    ...setting,
  }));
}

export default {
  getAlarmSetting,
  setAlarmSetting,
};
