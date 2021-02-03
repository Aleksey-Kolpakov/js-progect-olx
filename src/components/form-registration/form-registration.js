

const registrerFetch = function (submittedData) {
    return fetch(`https://callboard-backend.goit.global/auth/register`, {
      method: 'POST',
      body: JSON.stringify(submittedData),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
      .then(response => response.json())
      .catch(error => console.log(error));
}

const loginFetch = function (submittedData) {
    return fetch(`https://callboard-backend.goit.global/auth/login`, {
        method: 'POST',
        body: JSON.stringify(submittedData),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

function createMarkupReg() {
  return  ` <div class="container">
      <div class="registrationForm">
        <p class="registration-title">Для авторизации можете использовать Google Account:</p>
        <button class="registration-google" type="button"><svg class="registration-google-svg" width='17' height='17'>
          <use href='./images/sprite/sprite.svg#icon-google'></use>
        </svg>Google</button>
        <p class='registration-title'>Или войдите в приложение используя e-mail и пароль:</p>
        <div class="input-reg">
              <input data-email="email" class="registration-input" type="email" name="email" placeholder="E-mail" required>
              <span class="form__error">Это поле должно содержать E-Mail в формате example@site.com</span>
        </div>
        <div class="input-reg password">
                <input data-pass="pass" id="password"  class="registration-input" type="password" name="password" placeholder="Password" minlength="6" maxlength="18" required>
                <label class="show-password" for="show_password">
                  <input type="checkbox" name="show_password" id="show_password">
                 Показать пароль
                </label>
        </div>
        <div class="reg-aut-btn">
          <button class="enterAccount" type="submit">ВОЙТИ</button>
          <button class="registerAccount" data-reg="registration" type="submit">РЕГИСТРАЦИЯ</button>
        </div>
      </div>
    </div>`
}

export function openForm() {
  function listenerReg() {
    const authRefs = {
    enterAccountBtn: document.querySelector('.enterAccount'),
    registerAccountBtn: document.querySelector('.registerAccount'),
    inputEmail: document.querySelector('[data-email="email"]'),
    inputPass: document.querySelector('[data-pass="pass" ]'),
    showPass : document.querySelector('.show-password')
    };

  const submittedData = {
  email: '',
  password: '',
  }

authRefs.registerAccountBtn.addEventListener('click', () => {
  submittedData.email = authRefs.inputEmail.value
   submittedData.password = authRefs.inputPass.value
  registrerFetch(submittedData)
})

authRefs.enterAccountBtn.addEventListener('click', () => {
   submittedData.email = authRefs.inputEmail.value
  submittedData.password = authRefs.inputPass.value
  loginFetch(submittedData)
})

authRefs.showPass.addEventListener('click', function (event) {
	if (event.target.id !== 'show_password') return;
	var password = document.querySelector('#password');
	if (!password) return;
	if (event.target.checked) {
		password.type = 'text';
	} else {
		password.type = 'password';
	}
}, false);
  }
  // modal(createMarkupReg,listenerReg)
}
