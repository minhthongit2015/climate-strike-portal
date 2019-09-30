import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import EarthPicturePosts from './EarthPicturePosts';
import NewPostRow from '../../../components/blog/new-post/NewPostRow';


export default class TabEarthPicture extends BasePage {
  constructor(props) {
    super(props, 'Bức Tranh Trái Đất');
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
          <EarthPicturePosts
            ref={this.postListRef}
          />
        </SectionBody>
      </Section>
    );
  }
}
