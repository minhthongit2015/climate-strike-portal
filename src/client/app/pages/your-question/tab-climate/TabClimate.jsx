import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import DeepMessage from '../../../components/utils/deep-message/DeepMessage';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import ClimatePosts from './ClimatePosts';
import t from '../../../languages';


export default class TabClimate extends BasePage {
  constructor(props) {
    super(props, t('pages.yourQuestion.title.climate'));
    this.category = ['AskForClimate'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.yourQuestion.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category} PostList={ClimatePosts} />
        </SectionBody>
      </Section>
    );
  }
}
