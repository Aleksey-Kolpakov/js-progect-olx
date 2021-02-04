console.log('hello');


import { getEnglishCategories, getRussianCategories } from '../../utils/backend-services.js';

import templateCategory from './category.hbs';

getEnglishCategories().then(function (data) {
  return console.log(data);
});


// const fnCategory = function () {
//     getRussianCategories().then(function (data) {
//   return;
// });
// }


const categoryRef = document.querySelector('#form-category');
const form = document.querySelector('.form');

console.dir(form);

getRussianCategories().then(function (data) {
    const template = templateCategory(data);
    categoryRef.insertAdjacentHTML('beforeend', template);
    return console.log(data);
});

// console.dir(form.elements);
// console.log(form.elements.text.value);
// console.log(form.elements.photo.value);
// console.log(form.elements.description.value);
// form.elements.category.value = 1
    
getRussianCategories().then(function (data) {
  return console.log(data);
});
// console.log(form.elements.text.value);
// console.log(form.elements.text.value);
// console.log(form.elements.text.value);

// let a = inputCatRef.selectedOptions

// a = [1, 2];
// // inputCatRef.selectedOptions = [1, 2]
// inputCatRef.value = 'mashina';
// console.dir(inputCatRef);
// // const a = [1,2]
// // inputCatRef.labels = [1,2]


// // console.dir(inputCatRef.selectedOptions);
// // console.dir(inputCatRef.value);


function formDataCollect(event) {
    console.dir(event.target);
    event.preventDefault();
    const formData = new FormData(event.target);
    const submitData = {};
    formData.forEach((value, key) => { submitData[key] = value;});
    console.log(submitData);
    return submitData;
}

form.addEventListener("submit", formDataCollect);
