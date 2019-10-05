import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import OrganismsPosts from './OrganismsPosts';
import t from '../../../languages';
import DeepMessage from '../../../components/utils/deep-message/DeepMessage';


export default class TabOrganisms extends BasePage {
  constructor(props) {
    super(props, t('pages.earthPicture.title.organisms'));
    this.category = ['Organisms'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.earthPicture.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category}>
            <OrganismsPosts />
          </PostsModule>
        </SectionBody>
      </Section>
    );
  }
}
