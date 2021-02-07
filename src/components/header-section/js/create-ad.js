import refs from './refs';
// import { isUserAutorized } from '../../../utils/initial-load';
import { openForm } from '../../form-registration/form-registration';
import { openModalAddItem } from '../../form-item/form-create-item';

refs.createAdButton.addEventListener('click', onCreateAdButtonClick);

function onCreateAdButtonClick() {
  // isUserAutorized()
  //   .then(data => {
  //     openModalAddItem();
  //   })
  //   .catch(data => {
  //     openForm();
  //   });

  if (
    refs.authorizationBlock.classList.contains('is-hidden') &&
    !refs.myCabinetBlock.classList.contains('is-hidden')
  ) {
    openModalAddItem();
  } else {
    openForm();
  }
}
