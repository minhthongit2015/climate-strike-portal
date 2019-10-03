const isDevelopment = process.env.NODE_ENV === 'development';
const isRunningLocal = window.location.hostname.includes('localhost');

let wsEndpoint = `wss://${window.location.host}`;
if (isRunningLocal) {
  wsEndpoint = 'ws://localhost:5000';
}

let httpEndpoint = '';
if (isRunningLocal) {
  httpEndpoint = 'http://localhost:5000';
}


const apiEndpoint = '/api';
const aiCloudEndpoint = `${apiEndpoint}/AI-Cloud`;

const common = {
  wsEndpoint,
  httpEndpoint,
  apiEndpoint,
  aiCloudEndpoint,
  GOOGLE_CLOUD_API_KEY: 'AIzaSyADxVggO7uEHn1jKcEKKajCsEUPlKVtct8'
};

const developmentLocal = {
  FACEBOOK_APP_ID: '556670908405905'
};

const developmentStaging = {
  FACEBOOK_APP_ID: '2467127226704927'
};

const production = {
  FACEBOOK_APP_ID: '415534815831116'
};

let currentConfig;
if (isDevelopment) {
  currentConfig = isRunningLocal
    ? developmentLocal
    : developmentStaging;
} else {
  currentConfig = production;
}

export default {
  ...common,
  ...currentConfig
};
