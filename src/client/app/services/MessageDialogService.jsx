import React from 'react';
import DialogService from './DialogService';

export default class extends DialogService {
  static show(title, message) {
    this.dialog.show(title, () => <div>{message}</div>);
  }
}
