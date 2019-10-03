let wsEndpoint = `wss://${window.location.host}`;
const isRunningLocal = window.location.hostname.includes('localhost');
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

const development = {
  ...common
};

const production = {
  ...common
};

const currentConfig = process.env.NODE_ENV === 'development'
  ? development
  : production;

export default {
  ...common,
  ...currentConfig
};
