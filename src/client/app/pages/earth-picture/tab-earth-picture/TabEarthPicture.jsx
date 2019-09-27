import React, { Component } from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import EarthPicturePosts from './sub-comps/EarthPicturePosts';
import NewPost from '../../../components/blog/new-post/NewPost';

class TabAICloud extends Component {
  render() {
    return (
      <Section>
        <SectionHeader>
          <div className="text-light text-center mb-5">ở đây không có gì ngoài những gì đang diễn ra...</div>
        </SectionHeader>
        <SectionBody>
          <NewPost />
          <br />
          <EarthPicturePosts />
        </SectionBody>
      </Section>
    );
  }
}

export default TabAICloud;
