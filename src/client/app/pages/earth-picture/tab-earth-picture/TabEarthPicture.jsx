import React, { Component } from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import EarthPicturePosts from './sub-comps/EarthPicturePosts';
import NewPost from '../../../components/blog/new-post/NewPost';

class TabAICloud extends Component {
  render() {
    return (
      <Section>
        <SectionHeader>
          <div className="text-dark text-center mb-5">ở đây không có gì ngoài sự thật</div>
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
