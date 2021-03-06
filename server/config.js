const pkg = require('../package.json');
const env = process.env;

const dev = env.NODE_ENV !== 'production';

module.exports = {
  name: pkg.name,
  version: pkg.version,
  dev: dev,
  buildDate: env.BUILD_DATE,
  commitId: env.COMMIT_ID,
  buildTag: env.BUILD_TAG,
  port: env.PORT || '3000',
  auth: {
    host: env.AUTH_HOST,
    keys: env.AUTH_KEYS
  }
};
