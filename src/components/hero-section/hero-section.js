import adsCardHandleBar from './hero.hbs';
import { callAdsAPI } from './fetchAPI';
import Slider from '../Slider';

const heroListRef = document.querySelector('.hero-list');
const heroListSliderRef = document.querySelector('.hero-list-slider');
callAdsAPI()
    .then(items => items.reduce((accObj, item, index) => {
        if (index > 0 && index <= 5) {
            item.id = index + 1;
            accObj.notslider.push(item);
            return accObj;
        }
        accObj.slider.push(item);
        return accObj;
    }, { slider: [], notslider: [] })
    )
    .then(ObjWithArrays => {
    const markUpNotSlider = adsCardHandleBar(ObjWithArrays.notslider);
    const markUpSlider = adsCardHandleBar(ObjWithArrays.slider);
        heroListRef.insertAdjacentHTML('beforeend', markUpNotSlider);
        heroListSliderRef.insertAdjacentHTML('beforeend', markUpSlider);
        new Slider({ listUlSelector: ".hero-list-slider", buttons: false, autoScroll: true });
});











/* ============================================================== */









// import { callAPI, callFindAPI, callCategoriesAPI, callRussianCategoriesAPI, callSpecificCategoryAPI, callAdsAPI } from './fetchAPI';
// const tryFetch = () => {
//     callAPI(1);
//     callAPI(2);
//     callAPI(3);
//     callFindAPI('car');
//     callCategoriesAPI();
//     callRussianCategoriesAPI();
//     callSpecificCategoryAPI();
//     callAdsAPI();
// };

// tryFetch();