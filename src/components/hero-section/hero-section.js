import throttle from 'lodash.throttle';
import adsCardHandleBar from './hero.hbs';
import { callAdsAPI } from './fetchAPI';
import Slider from '../Slider';

const heroListRef = document.querySelector('.hero-list');
const heroListSliderRef = document.querySelector('.hero-list-slider');
const fetchResult = callAdsAPI();

const renderHero = () => {
    fetchResult.then(items => items.reduce((accObj, item, index) => {
        if (innerWidth >= 1280 && index > 0 && index <= 5) {
            item.id = index + 1;
            accObj.notslider.push(item);
            return accObj;
        }
        if (innerWidth >= 768 && index > 0 && index <= 2) {
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
            new Slider({ listUlSelector: ".hero-list-slider", autoScroll: true });
        });
};


const refreshHero = () => {
    heroListSliderRef.textContent = '';
    const adsCardCollection = heroListRef.children;
    adsCardCollection.forEach(card => {
        if (card.id !== 'item1') {
            card.remove();
        }
    })
}

const resizeWindowRerender = () => {
    refreshHero();
    renderHero();
}

renderHero();
window.addEventListener('resize', throttle(resizeWindowRerender,1000))










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