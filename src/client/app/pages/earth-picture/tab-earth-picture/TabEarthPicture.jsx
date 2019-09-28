import React, { Component } from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import EarthPicturePosts from './sub-comps/EarthPicturePosts';
import NewPost from '../../../components/blog/new-post/NewPost';

class TabEarthPicture extends Component {
  constructor(props) {
    super(props);
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
          <div className="text-light text-center mb-5">ở đây không có gì ngoài những gì đang diễn ra...</div>
        </SectionHeader>
        <SectionBody>
          <NewPost onPosted={this.handlePostPosted} />
          <EarthPicturePosts
            ref={this.postListRef}
          />
        </SectionBody>
      </Section>
    );
  }
}

export default TabEarthPicture;
