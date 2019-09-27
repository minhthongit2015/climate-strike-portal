import React from 'react';
import './DropUploader.scss';
import classnames from 'classnames';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleStartUpload = this.handleStartUpload.bind(this);
    this.inputRef = React.createRef();
    this.state = {
      uploading: false,
      preview: null
    };
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
        uploading: false,
        preview: event1.target.result
      });
    };

    const newFile = event.target.files[0];
    reader.readAsDataURL(newFile);

    this.triggerUploadedEvent();
  }

  triggerUploadedEvent() {
    if (this.props.onFileUploaded) {
      this.props.onFileUploaded();
    }
  }

  render() {
    const {
      className, wrapperProps, innerClass, ...restProps
    } = this.props;
    const { uploading, preview } = this.state;
    return (
      <div className={classnames('drop-uploader', className)} {...wrapperProps}>
        <label
          className={classnames('drop-uploader__drop-zone rounded', innerClass)}
          style={{ backgroundImage: `url(${preview})` }}
          {...restProps}
        >
          {uploading
            ? <span>đang tải ảnh lên...</span>
            : !preview && <span>tải ảnh lên</span>}
          <input
            type="file"
            accept="image/*"
            onChange={this.handleFileUpload}
            onInput={this.handleStartUpload}
            ref={this.inputRef}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    );
  }
}
