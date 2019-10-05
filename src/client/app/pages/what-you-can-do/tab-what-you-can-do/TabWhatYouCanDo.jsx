import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import DeepMessage from '../../../components/utils/deep-message/DeepMessage';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import WhatYouCanDoPosts from './WhatYouCanDoPosts';
import t from '../../../languages';


export default class TabWhatYouCanDo extends BasePage {
  constructor(props) {
    super(props, t('pages.whatYouCanDo.title.main'));
    this.category = 'WhatYouCanDo';
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.whatYouCanDo.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule rootCategory={this.category}>
            <WhatYouCanDoPosts />
          </PostsModule>
        </SectionBody>
      </Section>
    );
  }
}
