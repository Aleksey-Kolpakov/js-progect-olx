import axios from 'axios';
const getHeroAdsFromBackend = function () {
    axios.get('https://callboard-backend.goit.global/call/ads').
        then(({ data }) => console.log(data));
};
const registerData = {
    email: "testwwecxc911@test.com",
    password: "qwerty123"
};
// const registrerFetch = function (registerData) {

//   return  axios.get('https://callboard-backend.goit.global/auth/register',registerData).
//         then(( data ) => console.log(data));
// }

const registrerFetch = function (registerData) {
        return fetch(`https://callboard-backend.goit.global/auth/register`, {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
               
            }
        })
            .then(response => response.json())
            .catch(error=>console.log(error));
}

const loginFetch = function (registerData) {
        return fetch(`https://callboard-backend.goit.global/auth/login`, {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
               
            }
        })
            .then(response => response.json())
            .catch(error=>console.log(error));
}
 
