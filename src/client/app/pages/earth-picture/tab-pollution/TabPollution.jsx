import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import PollutionPosts from './PollutionPosts';
import NewPostRow from '../../../components/blog/new-post/NewPostRow';
import t from '../../../languages';


export default class TabPollution extends BasePage {
  constructor(props) {
    super(props, t('pages.earthPicture.title.pollution'));
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
          <div className="text-light text-center mb-5">{t('pages.earthPicture.mainMessage')}</div>
        </SectionHeader>
        <SectionBody>
          <NewPostRow onPosted={this.handlePostPosted} />
          <PollutionPosts
            ref={this.postListRef}
          />
        </SectionBody>
      </Section>
    );
  }
}
