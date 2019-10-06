import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import DeepMessage from '../../../components/utils/deep-message/DeepMessage';
import OthersPosts from './OthersPosts';
import t from '../../../languages';


export default class extends BasePage {
  constructor(props) {
    super(props, t('pages.yourQuestion.title.orthers'));
    this.category = ['AskForOthers'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.yourQuestion.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category} PostList={OthersPosts} />
        </SectionBody>
      </Section>
    );
  }
}
