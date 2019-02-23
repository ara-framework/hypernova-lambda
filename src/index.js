const BatchManager = require('hypernova/lib/utils/BatchManager');

const defaultConfig = {
  devMode: false,
  plugins: [],
};

const response = (manager, callback) => () => {
  callback(null, {
    statusCode: manager.statusCode,
    body: JSON.stringify(manager.getResults()),
  });
};

module.exports = (event, userConfig, callback) => {
  const config = { ...defaultConfig, ...userConfig };

  const { body } = event;

  if (!body) {
    throw Error('The body is empty');
  }

  const jobs = JSON.parse(body);

  if (typeof config.getComponent !== 'function') {
    throw new TypeError('Hypernova requires a `getComponent` property and it must be a function');
  }

  const manager = new BatchManager(null, null, jobs, config);

  const promises = Object.keys(jobs).map(token => manager.render(token)
    .catch(err => manager.recordError(err, token)));

  const handler = response(manager, callback);

  Promise.all(promises)
    .then(handler);
};
