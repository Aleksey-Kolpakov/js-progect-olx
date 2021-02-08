import { getEnglishCategories, getRussianCategories,  createItemFetch, registerUserApi, loginFetch} from '../../utils/backend-services.js';
import templateCategory from './category.hbs';
import { RussianCategoriesPromise } from '../../utils/initial-load.js';

//------------------------------------------- ф-я загрузки категорий с бэкэнда в input
export function addRusCategory() {
  const categoryRef = document.querySelector('#form-category');

  RussianCategoriesPromise.then(function (data) {
    const template = templateCategory(data);
    categoryRef.insertAdjacentHTML('beforeend', template);
    return;
  })
}



export function sendItemOnServer() {
  const form = document.querySelector('.form');

  //------------------------------------------- Список доступных категорий (должно совпадать с бэкэндом)
  
  const listOfCategory = {
  "Недвижимость": "property",
  "Транспорт": "transport",
  "Работа": "work",
  "Электроника": "electronics",
  "Бизнес и услуги": "business and services",
  "Отдых и спорт": "recreation and sport",
  "Отдам бесплатно": "free",
  "Обмен": "trade",
}
  //-------------------------------------Переводчик категорий для отправки на бэкэнд
  
  function translator(rus, list) {
    if (listOfCategory[rus] === undefined) {
      console.warn('Отсутствует перевод. Отредактируйте список категорий - listOfCategory (form-create)')
    }
    return listOfCategory[rus];
  }
  
  //------------------------------------------- ф-я сбора всех полей
  
  function formDataCollect(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const submitData = {};

    formData.forEach((value, key) => { submitData[key] = value;});
    submitData.category = translator(submitData.category, listOfCategory);
    console.log(submitData)

    createItemFetch(submitData);
    return submitData;
  }
  
  form.addEventListener("submit", formDataCollect);
}


//-------------------------------------------------------Тестирование УДАЛИТЬ
/*const testUser = async function () {
 // const regData = await registerUserApi(registerData);
  const loginData = await loginFetch(registerData);
  return loginData;
}

const registerData = {
  email: 'testwwehnjuq@test.com',
  password: 'qwerty123',
};

//testUser(registerData).then(data=>console.log(data));
//createItemFetch(submitData).then(data=>console.log(data));

const testItem = {
  title: "Курточка", 
  file: "@_pigment_file.jpg;type=image/jpeg",
  description: "Хорошо", 
  category: "property", 
  price: "200",
  phone: "+380673332211"
}

//reateItemFetch(testItem);*/