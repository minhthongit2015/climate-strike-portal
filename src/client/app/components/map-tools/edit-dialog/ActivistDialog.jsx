import React from 'react';
import { MDBInput } from 'mdbreact';
import BaseEditingDialog from './BaseEditingDialog';
import DropUploader from '../../utils/drop-uploader/DropUploader';


export default class ActivistDialog extends BaseEditingDialog {
  static get type() { return 'Activist'; }

  renderContent() {
    const { place = {} } = this.state;
    const { user = {}, description, cover } = place;
    const { name } = user;

    return (
      <React.Fragment>
        <DropUploader
          label="Tải ảnh bìa"
          name="cover"
          value={cover}
          // videoName="video"
          // video={cover}
          onChange={this.handleInputChange}
          className="px-2 pb-4 pt-1"
        />
        <MDBInput
          label="Tên"
          name="name"
          value={name}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
          required
          disabled
        />
        <MDBInput
          label="Giới thiệu"
          name="description"
          value={description}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
        />
      </React.Fragment>
    );
  }
}
