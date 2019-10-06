import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import DeepMessage from '../../../components/utils/deep-message/DeepMessage';
import OrganismsPosts from './OrganismsPosts';
import t from '../../../languages';


export default class TabOrganisms extends BasePage {
  constructor(props) {
    super(props, t('pages.yourQuestion.title.organisms'));
    this.category = ['AskForOrganisms'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.yourQuestion.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category} PostList={OrganismsPosts} everyoneCanPost />
        </SectionBody>
      </Section>
    );
  }
}
