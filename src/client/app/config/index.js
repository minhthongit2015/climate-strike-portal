let wsEndpoint = 'ws://localhost:5000';
if (!window.location.hostname.includes('localhost')) {
  wsEndpoint = `ws://${window.location.host}`;
}


const apiEndpoint = '/api';
const aiCloudEndpoint = `${apiEndpoint}/AI-Cloud`;

const common = {
  apiEndpoint,
  aiCloudEndpoint
};

const development = {
  ...common,
  wsPort: 5000,
  wsEndpoint
};

const production = {
  ...common,
  wsPort: process.env.PORT || 80,
  wsEndpoint
};

const currentConfig = process.env.NODE_ENV === 'development'
  ? development
  : production;

export default {
  common,
  development,
  production,
  currentConfig
};
