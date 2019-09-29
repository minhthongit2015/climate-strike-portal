import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import PollutionPosts from './PollutionPosts';
import NewPost from '../../../components/blog/new-post/NewPost';


export default class TabPollution extends BasePage {
  constructor(props) {
    super(props, 'Bức Tranh Ô Nhiễm');
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
          <NewPost onPosted={this.handlePostPosted} />
          <PollutionPosts
            ref={this.postListRef}
          />
        </SectionBody>
      </Section>
    );
  }
}
