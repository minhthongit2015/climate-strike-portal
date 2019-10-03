import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import EarthPicturePosts from './EarthPicturePosts';
import t from '../../../languages';
import PostsModule from '../../../components/blog/posts-module/PostsModule';


export default class TabEarthPicture extends BasePage {
  constructor(props) {
    super(props, t('pages.earthPicture.title.main'));
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <div className="text-light text-center mb-5">{t('pages.earthPicture.mainMessage')}</div>
        </SectionHeader>
        <SectionBody>
          <PostsModule>
            <EarthPicturePosts />
          </PostsModule>
        </SectionBody>
      </Section>
    );
  }
}
