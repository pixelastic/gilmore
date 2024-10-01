import { error: firostError, env } from 'firost';
import { _, pProps } from 'golgoth';

const KNOWN_ERROR_CODES = {
  1: 'GILMORE_COMMIT_NOTHING_TO_COMMIT',
  128: 'GILMORE_COMMIT_AUTHOR_IDENTITY_UNKNOWN',
};

/**
 * Commit files
 * @param {string} message Commit message
 * @param {object} userOptions Additional options
 * @param {string} userOptions.body Commit body text
 * @param {boolean} userOptions.skipCi Set to true to skip the CI build (default is
 * false)
 * @returns {string} Current commit hash
 **/
export default async function (message, userOptions = {}) {
  await setDefaultCommitUser(this);

  const options = {
    skipCi: false,
    ...userOptions,
  };

  // Building the command
  const baseCommand = ['commit', `--message "${message}"`];
  const optionsToFlags = {
    body: `--message "${options.body}"`,
    skipCi: '--message "[skip ci]"',
    skipHooks: '--no-verify',
  };
  const command = _.chain(baseCommand)
    .thru((item) => {
      _.each(optionsToFlags, (flag, optionName) => {
        if (options[optionName]) {
          item.push(flag);
        }
      });
      return item;
    })
    .join(' ')
    .value();

  // Run the command and catch common failures
  try {
    await this.run(command);
    return await this.currentCommit();
  } catch (err) {
    if (KNOWN_ERROR_CODES[err.code]) {
      throw new firostError(KNOWN_ERROR_CODES[err.code], err);
    }
    throw err;
  }
};

/**
 * Sets commit default user and email as local repo config
 * @param {object} repo Parent Gilmore repo instance
 **/
async function setDefaultCommitUser(repo) {
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
      const configValue = await repo.getConfig(configKey);
      if (overwriteValue && !configValue) {
        await repo.setConfig(configKey, overwriteValue);
      }
    },
    { concurrency: 1 }
  );
}
