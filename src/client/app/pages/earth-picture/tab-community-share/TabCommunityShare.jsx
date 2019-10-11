import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import CommunitySharePosts from './CommunitySharePosts';
import t from '../../../languages';
import DeepMessage from '../../../components/utils/deep-message/DeepMessage';
import BlogPage from '../../_base/BlogPage';


export default class extends BlogPage {
  constructor(props) {
    super(props, t('pages.earthPicture.title.communityShare'));
    this.category = ['CommunityShare'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.earthPicture.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category} PostList={CommunitySharePosts} everyoneCanPost />
        </SectionBody>
      </Section>
    );
  }
}
