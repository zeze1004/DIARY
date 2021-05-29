import { Account } from '@state/account';

function getAccount() {
  const account = localStorage.getItem('ACCOUNT');
  return account ? JSON.parse(account) : null;
}

function setAccount(account: Account) {
  localStorage.setItem('ACCOUNT', JSON.stringify(account));
}

export default {
  getAccount,
  setAccount,
};
