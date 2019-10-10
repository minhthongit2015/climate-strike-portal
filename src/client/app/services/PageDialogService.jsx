
export default class PageDialogService {
  static get dialog() {
    return this.dialogRef.current;
  }

  static init(dialogRef) {
    this.dialogRef = dialogRef;
  }

  static pushHistory({ url, title, state }) {
    this.dialog.pushHistory({ url, title, state });
  }

  static replaceHistory({ url, title, state }) {
    this.dialog.replaceHistory({ url, title, state });
  }

  static setContent(content) {
    this.dialog.setContent(content);
  }

  static setHandler(handler) {
    this.dialog.setHandler(handler);
  }

  static toggle() {
    this.dialog.toggle();
  }

  static open() {
    this.dialog.open();
  }

  static close() {
    this.dialog.close();
  }
}
