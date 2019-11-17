import React from 'react';
import { MDBInput } from 'mdbreact';
import BaseEditingDialog from './BaseEditingDialog';
import DropUploader from '../../utils/drop-uploader/DropUploader';


export default class StrikeDialog extends BaseEditingDialog {
  static get type() { return 'Strike'; }

  get place() {
    const originPlace = super.place;
    const { place } = this.state;
    const { prev, next } = place;
    return {
      ...originPlace,
      prev: prev && prev._id,
      next: next && next._id
    };
  }

  renderContent() {
    const { place = {} } = this.state;
    const {
      name, description, address, cover, prev, next
    } = place;

    return (
      <React.Fragment>
        <DropUploader
          label="Tải ảnh bìa"
          name="cover"
          value={cover}
          useVideo={false}
          onChange={this.handleInputChange}
          className="px-2 pb-4 pt-1"
        />
        <MDBInput
          label="Tiêu đề"
          name="name"
          value={name}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
          required
        />
        <MDBInput
          label="Giới thiệu"
          name="description"
          value={description}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
        />
        <MDBInput
          label="Địa điểm"
          name="address"
          value={address}
          onChange={this.handleInputChange}
          autoComplete="off"
          autofill="off"
        />
        <MDBInput
          label="Địa điểm tiếp theo (url hoặc id)"
          name="next"
          data-type="place"
          value={typeof next === 'object' ? (next.name || next.baseOrder) : next}
          onChange={this.handleLinkChange}
          autoComplete="off"
          autofill="off"
        />
      </React.Fragment>
    );
  }
}
