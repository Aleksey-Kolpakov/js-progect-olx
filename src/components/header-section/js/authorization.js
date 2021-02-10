import refs from './refs';
import { closeMobileMenu, clearFilterButtons } from './service';
import { openForm } from '../../form-registration/form-registration';

refs.registrationButton.addEventListener('click', openForm);
refs.loginButton.addEventListener('click', openForm);

refs.myCabinetButton.addEventListener('click', () => {
  closeMobileMenu();
  clearFilterButtons();
});
