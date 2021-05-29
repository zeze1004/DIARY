import LocalStorage from "@/localStorage";

// declare type
export type Account = {
  email: string;
  nickname: string;
};

export enum SIGNBOX_TYPE {
  SIGN_IN,
  SIGN_UP,
}

let signBoxType: SIGNBOX_TYPE = SIGNBOX_TYPE.SIGN_IN;

export type ChangeListener = (account: Account, signBoxType: SIGNBOX_TYPE) => any;

// change listeners
const onChangeListeners: ChangeListener[] = [];

// date state

export function getAccount() {
  return LocalStorage.getAccount();
}

export function setAccount(account: Account) {
  LocalStorage.setAccount(account);
  dispatchChange();
}

export function getSignBoxType() {
  return signBoxType;
}

export function switchSignBoxType() {
  signBoxType = (signBoxType === SIGNBOX_TYPE.SIGN_IN ? SIGNBOX_TYPE.SIGN_UP : SIGNBOX_TYPE.SIGN_IN);
  dispatchChange();
}

export function addOnChangeListener(listener: ChangeListener) {
  onChangeListeners.push(listener);
}

export function dispatchChange() {
  const account = getAccount();
  onChangeListeners.forEach(listener => listener(account, signBoxType));
}

