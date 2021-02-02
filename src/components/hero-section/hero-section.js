import './_hero-section-styles.scss';
import adsCardHandleBar from './hero.hbs';
import { callAdsAPI } from './fetchAPI';

const heroListRef = document.querySelector('.hero-list');
callAdsAPI().then(data => data.filter((item, index) => {
    if (index <= 5) {
        item.id = index+1;
        return item;
    }
}))
    .then(data => {
    const markUp = adsCardHandleBar(data);
        heroListRef.insertAdjacentHTML('beforeend', markUp);
});














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