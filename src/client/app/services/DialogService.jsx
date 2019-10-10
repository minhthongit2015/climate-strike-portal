
export default class DialogService {
  static get dialog() {
    return this.dialogRef.current;
  }

  static init(dialogRef) {
    this.dialogRef = dialogRef;
  }

  static setDialogRef(dialogRef) {
    this.dialogRef = dialogRef;
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

  static show(...args) {
    this.dialog.show(...args);
  }
}
