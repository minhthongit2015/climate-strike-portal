const superagent = require('superagent');

module.exports = class {
  static oauth2() {

  }

  static saveTokenFromCode() {

  }

  static createAlbum() {
    return superagent.post('https://api.imgur.com/3/album')
      .set('Authorization', 'Client-ID 5c554fb08f17da4')
      .send({
        title: 'test album'
      });
  }

  static create(image, album) {
    const rawImage = image.slice(image.indexOf(',') + 1);
    return superagent.post('https://api.imgur.com/3/upload')
      .set('Authorization', 'Client-ID 5c554fb08f17da4')
      .send({
        image: rawImage,
        type: 'base64',
        name: 'test.png',
        title: 'test image',
        album
      });
  }
};
