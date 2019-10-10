import React from 'react';
import DialogService from './DialogService';

export default class extends DialogService {
  static show(title, message) {
    super.show(title, () => <div>{message}</div>);
  }
}
