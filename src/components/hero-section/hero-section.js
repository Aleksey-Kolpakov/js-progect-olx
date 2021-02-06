import throttle from 'lodash.throttle';
import adsCardHandleBar from './hero.hbs';
import { callAdsAPI } from './fetchAPI';
import Slider from '../Slider';

const heroListRef = document.querySelector('.hero-list');
const heroListSliderRef = document.querySelector('.hero-list-slider');
const fetchResult = callAdsAPI();

const renderHero = () => {
    fetchResult.then(items => items.reduce((accObj, item, index) => {
        const newItem = { ...item };
        if (innerWidth >= 1280 && index > 0 && index <= 5) {
            newItem.id = index + 1;
            accObj.notslider.push(newItem);
            return accObj;
        }
        if (innerWidth >= 768 && index > 0 && index <= 2) {
            newItem.id = index + 1;
            accObj.notslider.push(newItem);
            return accObj;
        }
        accObj.slider.push(newItem);
        return accObj;
    }, { slider: [], notslider: [] })
    ).then(ObjWithArrays => {
            const markUpNotSlider = adsCardHandleBar(ObjWithArrays.notslider);
            const markUpSlider = adsCardHandleBar(ObjWithArrays.slider);
            heroListRef.insertAdjacentHTML('beforeend', markUpNotSlider);
            heroListSliderRef.insertAdjacentHTML('beforeend', markUpSlider);
    }).then(() => {
            const heroListForSlideRef = document.querySelector('.hero-list-slider');
            if (!heroListForSlideRef) {
                return;
            }
            new Slider({ listUlSelector: heroListForSlideRef, autoScroll: true, timeAutoScroll: 3000 })
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

const { MOBILE, TABLET, DESKTOP } = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop'
}

const setTypeOfScreen = () => {
    const currentScreenWidth = window.innerWidth;
    let screenType = null;
    if (currentScreenWidth < 768) {
      return screenType = MOBILE;
    }
    if (currentScreenWidth >= 768 && currentScreenWidth <1280) {
        return screenType  = TABLET;
    }
    if (currentScreenWidth >= 1280) {
        return screenType  = DESKTOP;
    }
  }

let prevScreenType = setTypeOfScreen();

const checkScreenWidth = () => {
    const currentScreenType = setTypeOfScreen();
    if (currentScreenType === prevScreenType) {
      return false;
    }
    prevScreenType = currentScreenType;
    return true;
  }

const resizeWindowRerender = () => {
    const mustRerender = checkScreenWidth();
    if (!mustRerender) {
      return;
    }
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