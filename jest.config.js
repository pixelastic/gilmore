const config = require('aberlaas/configs/jest.js');
module.exports = {
  ...config,
  globalSetup: '<rootDir>/../jest.globalSetup.js',
};
