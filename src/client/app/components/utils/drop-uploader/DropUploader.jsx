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
    if (event.target.name === 'video') {
      const match = event.target.value.match(/src="(.*?)"/);
      if (match && match[1]) {
        [, event.target.value] = match;
      }
    }
    this.dispatchUploadedEvent(event);
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
      event.value = event1.target.result;
      this.dispatchUploadedEvent(event);
    };

    const newFile = event.target.files[0];
    reader.readAsDataURL(newFile);
  }

  dispatchUploadedEvent(event) {
    const { value, name } = event.target;
    if (this.props.onChange) {
      this.props.onChange({
        target: {
          name,
          value
        },
        preventDefault: () => {}
      });
    }
  }

  render() {
    const {
      className, wrapperProps, innerClass, label, name, videoName, value = '', video = '', ...restProps
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
            name="image"
            onChange={this.handleFileUpload}
            onInput={this.handleStartUpload}
            ref={this.inputRef}
            style={{ display: 'none' }}
          />
        </label>
        <input
          className="drop-uploader__url-input px-2 rounded"
          placeholder="URL hình ảnh"
          name={name}
          value={urlInputValue}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
          spellCheck="false"
          autoCorrect="false"
        />
        <input
          className="drop-uploader__url-input px-2 mt-2 rounded"
          placeholder="URL video"
          name={videoName}
          value={video}
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
