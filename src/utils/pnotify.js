import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { alert, notice, info, success, error } from '@pnotify/core';

import { defaults } from '@pnotify/core';

defaults.mode = 'light';
defaults.closerHover = true;
defaults.delay = 4000;

export function makeNotice(message) {
  const myNotice = error({
    text: message,
  });
}

export function authRegError(message) {
  const eror = error({
    text:message
  })
}
export function regSuccess(message) {
  const success = succ({
    text: message
  })
}