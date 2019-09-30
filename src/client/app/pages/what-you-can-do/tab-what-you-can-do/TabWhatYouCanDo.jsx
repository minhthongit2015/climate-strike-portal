import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import WhatYouCanDoPosts from './WhatYouCanDoPosts';
import NewPostRow from '../../../components/blog/new-post/NewPostRow';


export default class TabWhatYouCanDo extends BasePage {
  constructor(props) {
    super(props, 'Điều Bạn Có Thể Làm');
    this.postListRef = React.createRef();
    this.handlePostPosted = this.handlePostPosted.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handlePostPosted() {
    // this.postListRef.current.refresh();
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <div className="text-light text-center mb-5">ở đây không có gì ngoài sự thật...</div>
        </SectionHeader>
        <SectionBody>
          <NewPostRow onPosted={this.handlePostPosted} />
          <WhatYouCanDoPosts
            ref={this.postListRef}
          />
        </SectionBody>
      </Section>
    );
  }
}
