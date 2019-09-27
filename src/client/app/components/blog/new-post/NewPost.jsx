import React from 'react';
import {
  MDBInput, MDBCard, MDBCardHeader, MDBCardBody,
  Button
} from 'mdbreact';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// eslint-disable-next-line import/extensions
import 'froala-editor/js/plugins.pkgd.min.js';


export default class extends React.Component {
  constructor(props) {
    super(props);

    this.config = {
      placeholderText: 'Edit Your Content Here!',
      charCounterCount: false,
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo']
    };

    this.handleModelChange1 = this.handleModelChange1.bind(this);
    this.handleModelChange2 = this.handleModelChange2.bind(this);

    this.state = {
      model1: { src: 'path/to/image.jpg' }
    };
  }

  handleModelChange1(model1) {
    this.setState({
      model1
    });
  }

  render() {
    return (
      <MDBCard className="new-post">
        <MDBCardHeader className="d-flex justify-content-between py-0">
          <div className="flex-fill d-flex align-items-center">Đăng bài mới</div>
          <Button color="link" className="p-2"><i className="far fa-window-close" /></Button>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBInput
            type="text"
            name="title"
            label="Title"
          />
          <FroalaEditorComponent
            tag="textarea"
            config={this.config}
            model={this.state.model1}
            onModelChange={this.handleModelChange1}
          />
          <FroalaEditorView
            model={this.state.model1}
          />
          {/* <FroalaEditorComponent
            tag="textarea"
            config={this.config}
            model={this.state.model2}
            onModelChange={this.handleModelChange2}
          />
          <FroalaEditorView
            model={this.state.model2}
          /> */}
        </MDBCardBody>
      </MDBCard>
    );
  }
}
