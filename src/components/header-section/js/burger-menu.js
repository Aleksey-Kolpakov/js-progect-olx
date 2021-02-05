import refs from './refs';
import { openMobileMenu, closeMobileMenu } from './service';

refs.burgerMenuButton.addEventListener('click', openMobileMenu);
refs.mobileCloseButton.addEventListener('click', closeMobileMenu);
