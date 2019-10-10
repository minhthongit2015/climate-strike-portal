import DialogService from './DialogService';

export default class PageDialogService extends DialogService {
  static pushHistory({ url, title, state }) {
    this.dialog.pushHistory({ url, title, state });
  }

  static replaceHistory({ url, title, state }) {
    this.dialog.replaceHistory({ url, title, state });
  }
}
