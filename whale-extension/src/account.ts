import API from "@api/account";

import { Account, SIGNBOX_TYPE, addOnChangeListener, ChangeListener, getSignBoxType, switchSignBoxType } from "@state/account";

const updateAccount: ChangeListener = (account: Account, signBoxType: SIGNBOX_TYPE) => {
  const accountBox = document.getElementById('account_box') as HTMLInputElement;
  const accountNickname = document.getElementById('account_nickname') as HTMLElement;
  const signBox = document.getElementById('sign_box') as HTMLElement;
  const accountNicknameBox = document.getElementById('account_nickname_box') as HTMLInputElement;
  const btnSignin = document.getElementById('btn_signin') as HTMLInputElement;
  const btnSignup = document.getElementById('btn_signup') as HTMLInputElement;
  const btnSwitch = document.getElementById('btn_switch') as HTMLInputElement;

  if (account) {
    accountBox.hidden = false;
    signBox.hidden = true;
    accountNickname.innerHTML = account.nickname;
  } else {
    accountBox.hidden = true;
    signBox.hidden = false;

    if (signBoxType === SIGNBOX_TYPE.SIGN_IN) {
      // sign in
      btnSignin.hidden = false;
      btnSignup.hidden = true;
      accountNicknameBox.hidden = true;
      btnSwitch.innerHTML = '회원가입';
    } else {
      // sign up
      btnSignin.hidden = true;
      btnSignup.hidden = false;
      accountNicknameBox.hidden = false;
      btnSwitch.innerHTML = '로그인';
    }
  }
};

export function initAccountBox() {
  const signBox = document.getElementById('sign_box') as HTMLFormElement;
  const accountEmailInput = document.getElementById('account_email_input') as HTMLInputElement;
  const accountPasswordInput = document.getElementById('account_password_input') as HTMLInputElement;
  const accountNicknameInput = document.getElementById('account_nickname_input') as HTMLInputElement;
  const btnSwitch = document.getElementById('btn_switch') as HTMLInputElement;

  signBox.addEventListener('submit', async e => {
    e.preventDefault();
    const signBoxType = getSignBoxType();
    if (signBoxType === SIGNBOX_TYPE.SIGN_IN) {
      // sign in
      const result = await API.signin(
        accountEmailInput.value,
        accountPasswordInput.value
      );
      console.log(result);
    } else {
      // sign up
      const result = await API.signup(
        accountEmailInput.value,
        accountPasswordInput.value,
        accountNicknameInput.value,
      );
      console.log(result);
    }
  });

  btnSwitch.addEventListener('click', switchSignBoxType);
}

// init the calendar
export function initAccount() {
  initAccountBox();
  addOnChangeListener(updateAccount);
}
