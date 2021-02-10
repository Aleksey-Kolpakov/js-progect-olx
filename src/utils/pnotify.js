import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { alert, notice, info, success, error } from '@pnotify/core';

import { defaults } from '@pnotify/core';

defaults.mode = 'light';
defaults.closerHover = true;
defaults.delay = 3000;

export function makeNoticeError(message) {
  const myNotice = error({
    text: message,
  });
}
export function makeNoticeSuccess(message) {
  const myNotice = success({
    text: message,
  });
}
export function makeNotice(message) {
  const myNotice = notice({
    text: message,
  });
}

export function noticeToReg(message) {
  const noticeToReg = notice({
    text: message,
  });
}
