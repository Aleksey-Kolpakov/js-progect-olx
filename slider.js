export default class slider {
    constructor({selector}) {
        this.refs = this.getRefs(selector);
    }

    getRefs(selector) {
        const refs = {};
        refs.sliderBlock = document.querySelector(selector);
        return refs;
    }

    getItemsForSlideArray() {
        return [...this.refs.sliderBlock.children];
    }

    // enable() {
    //     this.refs.spinner.classList.add('is-hidden');
    //     this.refs.button.removeAttribute('disabled');
    //     this.refs.btnText.textContent = 'More...';
    // }

    // disable() {
    //     this.refs.spinner.classList.remove('is-hidden');
    //     this.refs.button.setAttribute('disabled', '');
    //     this.refs.btnText.textContent = 'Loading...';
    // }

    // show() {
    //     this.refs.button.classList.remove('is-hidden');
    // }

    // hide() {
    //     this.refs.button.classList.add('is-hidden');
    // }
}