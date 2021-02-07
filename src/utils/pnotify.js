import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { alert, notice, info, success, error } from '@pnotify/core';

import { defaults } from '@pnotify/core';

defaults.mode = 'light';
defaults.closerHover = true;
defaults.delay = 3000;

export function makeNotice(message) {
  const myNotice = error({
    text: message,
  });
}
