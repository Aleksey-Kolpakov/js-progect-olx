import { modalBackDrop } from '../modal-window/modal-logic';
import {registerUserApi, loginFetch} from '../../utils/backend-services.js'
const  createMarkupReg =
  `<div class="registrationForm">
        <p class="registration-title">Для авторизации можете использовать Google Account:</p>
        <a class="registration-google" href="https://callboard-backend.goit.global/auth/google"><svg class="registration-google-svg" width='17' height='17'>
          <use href='./images/sprite/sprite.svg#icon-google'></use>
        </svg>Google</a>
        <p class='registration-title'>Или войдите в приложение используя e-mail и пароль:</p>
        <div class="input-reg">
              <input data-email="email" class="registration-input valid" type="email" name="email" placeholder="E-mail" required>
              <span class="form__error">Это поле должно содержать E-Mail в формате example@site.com</span>
        </div>
        <div class="input-reg password">
              <input data-pass="pass"  id="password"  class="registration-input valid" type="password" name="password" placeholder="Password" minlength="6" maxlength="18" required>
              <label class='show-password' for="show_password">
                <input type="checkbox" name="show_password" id="show_password">
                Show Password
              </label>
        </div>
        <div class="reg-aut-btn">
          <button class="enterAccount" type="submit">ВОЙТИ</button>
          <button class="registerAccount" data-reg="registration" type="submit">РЕГИСТРАЦИЯ</button>
        </div>
      </div>`
export function openForm() {
  function listenerReg() {
    const authRefs = {
    enterAccountBtn: document.querySelector('.enterAccount'),
    registerAccountBtn: document.querySelector('.registerAccount'),
    inputEmail: document.querySelector('[data-email="email"]'),
    inputPass: document.querySelector('[data-pass="pass"]'),
    showPass : document.querySelector('.show-password'),
    };

  const submittedData = {
  email: '',
  password: '',
  }

    const loginUser = function () {
      submittedData.email = authRefs.inputEmail.value;
      submittedData.password = authRefs.inputPass.value;
      loginFetch(submittedData);
    };

    const registerUser = function () {
      submittedData.email = authRefs.inputEmail.value;
      submittedData.password = authRefs.inputPass.value;
      registerUserApi(submittedData);
    };

  authRefs.registerAccountBtn.addEventListener('click', registerUser)
  authRefs.enterAccountBtn.addEventListener('click', loginUser)
  authRefs.showPass.addEventListener('click', function (event) {
	if (event.target.id !== 'show_password') return;
	let password = document.querySelector('#password');
	if (!password) return;
	if (event.target.checked) {
		password.type = 'text';
	} else {
		password.type = 'password';
	}
}, false);
  }
  modalBackDrop(createMarkupReg);
  listenerReg()
}

export const userTokenGoogle = new URLSearchParams(window.location.search).get('accessToken')
console.log(userTokenGoogle);
