import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import EarthPicturePosts from './EarthPicturePosts';
import t from '../../../languages';
import DeepMessage from '../../../components/utils/deep-message/DeepMessage';


export default class TabEarthPicture extends BasePage {
  constructor(props) {
    super(props, t('pages.earthPicture.title.main'));
    this.category = 'EarthPicture';
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.earthPicture.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule rootCategory={this.category}>
            <EarthPicturePosts />
          </PostsModule>
        </SectionBody>
      </Section>
    );
  }
}
