/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import './Video.scss';

export default class Video extends React.Component {
  static isVideo(props) {
    return props.src && props.src.includes('.mp4');
  }

  static isYoutube(props) {
    return props.src && props.src.match(/(youtube\.com|youtu\.be\/)/);
  }

  static isEmbeded() {
    return true;
  }

  static renderVideo(video) {
    const {
      src, tracks, className, ...restProps
    } = video;
    return (
      <div className="video-wrapper">
        <video
          src={src}
          className={`video w-100 ${className || ''}`}
          {...restProps}
        >
          {tracks && tracks.map(track => (
            <track
              key={track.src}
              default
              kind={track.kind || 'captions'}
              srcLang={track.lang || 'vi'}
              src={track.src || 'sunday.vtt'}
            />
          ))}
        </video>
      </div>
    );
  }

  static renderYoutube(video) {
    const {
      src, title, className, ...restProps
    } = video;
    let videoId;
    const patterns = [/\/watch\?v=(.*?)(&|$)/, /youtu\.be\/(.+?)(&|$)/];
    patterns.find((pattern) => {
      const match = src.match(pattern);
      if (match && match[1]) {
        [, videoId] = match;
        return true;
      }
      return false;
    });

    return (
      <div className="video-wrapper">
        <iframe
          className={`video ytb-video ${className || ''}`}
          title={title}
          type="text/html"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&hl=vi&playsinline=1&iv_load_policy=3`}
          frameBorder="0"
          allowFullScreen
          {...restProps}
        />
      </div>
    );
  }

  static renderEmbeded(video) {
    const {
      title, src, className, ...restProps
    } = video;
    let videoSrc = src;
    if (src.includes('<iframe ')) {
      const match = src.match(/src="(.*?)"/);
      if (match && match[1]) {
        [, videoSrc] = match;
      }
    }

    return (
      <div className="video-wrapper">
        <iframe
          className={`video embeded-video ${className || ''}`}
          title={title}
          src={videoSrc}
          type="text/html"
          width="100%"
          height="auto"
          frameBorder="0"
          allowFullScreen
          {...restProps}
        />
      </div>
    );
  }

  render() {
    if (Video.isVideo(this.props)) {
      return Video.renderVideo(this.props);
    }
    if (Video.isYoutube(this.props)) {
      return Video.renderYoutube(this.props);
    }
    if (Video.isEmbeded(this.props)) {
      return Video.renderEmbeded(this.props);
    }
    return null;
  }
}
