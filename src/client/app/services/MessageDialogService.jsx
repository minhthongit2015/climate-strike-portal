import React from 'react';
import DialogService from './DialogService';

export default class extends DialogService {
  static show(title, message) {
    super.show(title, () => <div>{message}</div>);
  }

  static showUpComingFeature(feature) {
    switch (feature) {
    case 'request-update':
      this.show(
        'Have a nice day! /=)',
        '(20/10) Tính năng đang được hoàn thành, mời bạn thử lại sau ít ngày.'
      );
      break;
    case 'save-post':
      this.show(
        'Wait me a second...',
        '(21/10) Tính năng đang được hoàn thành, mời bạn thử lại sau ít ngày.'
      );
      break;
    case 'i-will-do-this':
      this.show(
        'Tính năng đang xây dựng',
        '(24/10) Tính năng đang được hoàn thành, mời bạn thử lại sau ít ngày.'
      );
      break;
    default:
      break;
    }
  }
}
