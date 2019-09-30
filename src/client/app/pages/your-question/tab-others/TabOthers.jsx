import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import OthersPosts from './OthersPosts';
import NewPostRow from '../../../components/blog/new-post/NewPostRow';


export default class extends BasePage {
  constructor(props) {
    super(props, 'Hỏi về Chủ đề khác');
    this.postListRef = React.createRef();
    this.handlePostPosted = this.handlePostPosted.bind(this);
  }

  handlePostPosted() {
    this.postListRef.current.refresh();
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <div className="text-light text-center mb-5">ở đây không có gì ngoài sự thật...</div>
        </SectionHeader>
        <SectionBody>
          <NewPostRow onPosted={this.handlePostPosted} />
          <OthersPosts
            ref={this.postListRef}
          />
        </SectionBody>
      </Section>
    );
  }
}
