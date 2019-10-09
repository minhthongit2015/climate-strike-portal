module.exports = {
  publicFolder: 'public',
  viewsFolder: 'src/server/views',
  port: process.env.PORT || 5000,
  google: {
    SECRET_API_KEY: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    photo: {
      CLIENT_ID: process.env.GOOGLE_PHOTO_CLIENT_ID,
      CLIENT_SECRET: process.env.GOOGLE_PHOTO_CLIENT_SECRET,
      REDIRECT_URL: process.env.GOOGLE_PHOTO_REDIRECT_URL
    }
  }
};
