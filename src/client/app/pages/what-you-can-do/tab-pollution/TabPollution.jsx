import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import DeepMessage from '../../../components/utils/deep-message/DeepMessage';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import PollutionPosts from './PollutionPosts';
import t from '../../../languages';


export default class TabPollution extends BasePage {
  constructor(props) {
    super(props, t('pages.whatYouCanDo.title.pollution'));
    this.category = ['DoForPollution'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.whatYouCanDo.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category} PostList={PollutionPosts} />
        </SectionBody>
      </Section>
    );
  }
}
