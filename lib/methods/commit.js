import { _ } from 'golgoth';
import { firostError } from 'firost';

const KNOWN_ERROR_CODES = {
  1: 'GILMORE_COMMIT_NOTHING_TO_COMMIT',
  128: 'GILMORE_COMMIT_AUTHOR_IDENTITY_UNKNOWN',
};

/**
 * Commit files
 * @param {string} message Commit message
 * @param {object} userOptions Additional options
 * @param {string} userOptions.body Commit body text
 * @param {boolean} userOptions.skipCi Set to true to skip the CI build
 * @param {boolean} userOptions.skipHooks Set to true to skip hooks
 * @returns {string} Current commit hash
 **/
export async function commit(message, userOptions = {}) {
  const options = {
    skipCi: false,
    skipHooks: false,
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
}
