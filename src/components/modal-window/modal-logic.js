export function modalBackDrop(template) {
  const backDropRef = document.querySelector('.back-drop');
  const modalRef = document.querySelector('.modal');

  backDropRef.classList.add('is-open');

  modalRef.innerHTML = '';
  const addBtn = `<button class="exit-btn-escape">
            <svg class="exit-svg">
              <use href="./images/sprite/sprite.svg#icon-close"></use>
            </svg>
          </button>`;

  modalRef.insertAdjacentHTML('beforeend', addBtn);
  modalRef.insertAdjacentHTML('beforeend', createModalMarkup());

  function createModalMarkup() {
    return `${template}`;
  }
}
