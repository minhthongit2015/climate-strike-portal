import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import NewPostRow from '../../../components/blog/new-post/NewPostRow';
import ForEverythingPosts from './ForEverythingPosts';


export default class extends BasePage {
  constructor(props) {
    super(props, 'Bức Tranh Sinh Vật');
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
          <ForEverythingPosts
            ref={this.postListRef}
          />
        </SectionBody>
      </Section>
    );
  }
}
