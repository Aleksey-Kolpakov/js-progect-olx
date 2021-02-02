  const authRefs = {
    form: document.querySelector('.js-register-from'),
    enterAccountBtn: document.querySelector('.enterAccount'),
    registerAccountBtn: document.querySelector('.registerAccount'),
    inputEmail: document.querySelector('[data-email="email"]'),
    inputPass:  document.querySelector('[data-pass="pass" ]'),
  };

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
