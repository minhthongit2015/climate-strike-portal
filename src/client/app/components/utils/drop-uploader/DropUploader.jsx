import React from 'react';
import './DropUploader.scss';
import classnames from 'classnames';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleStartUpload = this.handleStartUpload.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.inputRef = React.createRef();
    this.state = {
      uploading: false
    };
  }

  handleInputChange(event) {
    this.dispatchUploadedEvent(event.target.value);
  }

  handleStartUpload() {
    this.setState({
      uploading: true
    });
  }

  handleFileUpload(event) {
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = (event1) => {
      this.setState({
        uploading: false
      });
      this.dispatchUploadedEvent(event1.target.result);
    };

    const newFile = event.target.files[0];
    reader.readAsDataURL(newFile);
  }

  dispatchUploadedEvent(imgUrlBase64) {
    if (this.props.onChange) {
      this.props.onChange({
        target: {
          name: this.props.name || 'file',
          value: imgUrlBase64
        },
        preventDefault: () => {}
      });
    }
  }

  render() {
    const {
      className, wrapperProps, innerClass, label, value = '', ...restProps
    } = this.props;
    const { uploading } = this.state;
    const urlInputValue = value && value.startsWith('http')
      ? value
      : '';

    return (
      <div className={classnames('drop-uploader d-flex flex-column', className)} {...wrapperProps}>
        <label
          className={classnames('drop-uploader__drop-zone rounded text-center', innerClass)}
          style={{ backgroundImage: `url(${value || ''})` }}
          {...restProps}
        >
          {uploading
            ? <span>đang tải ảnh lên...</span>
            : !value && <span>{label || 'tải ảnh lên'}</span>}
          <input
            type="file"
            accept="image/*"
            onChange={this.handleFileUpload}
            onInput={this.handleStartUpload}
            ref={this.inputRef}
            style={{ display: 'none' }}
          />
        </label>
        <input
          className="drop-uploader__url-input px-2 rounded"
          placeholder="URL hình ảnh"
          name="url"
          value={urlInputValue}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
          spellCheck="false"
          autoCorrect="false"
        />
      </div>
    );
  }
}
