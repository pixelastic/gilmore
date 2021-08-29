const { error: firostError, env } = require('firost');
const { pProps } = require('golgoth');

const KNOWN_ERROR_CODES = {
  1: 'GILMORE_COMMIT_NOTHING_TO_COMMIT',
  128: 'GILMORE_COMMIT_AUTHOR_IDENTITY_UNKNOWN',
};

/**
 * Commit files
 * @param {string} message Commit message
 * @returns {string} Current commit hash
 **/
module.exports = async function (message) {
  // We check for some ENV variables. If present, we use them as the local user
  // for our commit
  const configOverwrites = {
    GIT_USER_NAME: 'user.name',
    GIT_USER_EMAIL: 'user.email',
  };
  await pProps(
    configOverwrites,
    async (configKey, envName) => {
      const overwriteValue = env(envName);
      const configValue = await this.getConfig(configKey);
      if (overwriteValue && !configValue) {
        await this.setConfig(configKey, overwriteValue);
      }
    },
    { concurrency: 1 }
  );

  try {
    await this.run(`commit -m "${message}"`);
    return await this.currentCommit();
  } catch (err) {
    if (KNOWN_ERROR_CODES[err.code]) {
      throw new firostError(KNOWN_ERROR_CODES[err.code], err);
    }
    throw err;
  }
};
