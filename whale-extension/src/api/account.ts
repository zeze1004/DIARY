import { API, requestAPI } from ".";

async function signin(email: string, password: string) {
  await requestAPI(API.SIGNIN, {
    Idto: { email, password }
  });
}

async function signup(email: string, password: string, nickname = 'unknown') {
  await requestAPI(API.SIGNUP, {
    sdto: { email, nick_name: nickname, password }
  });
}

export default {
  signin,
  signup,
};
