const { _ } = require('golgoth');
const { uuid } = require('firost');
/**
 * Returns an history of past commits
 * @returns {Array} Array of past commits
 **/
module.exports = async function () {
  const commitSeparator = uuid();
  const keySeparator = uuid();
  const format = _.join(
    [
      commitSeparator,
      '%h', // hash
      '%s', // message
      keySeparator,
    ],
    keySeparator
  );

  let output;
  try {
    const gitOptions = [
      '-n 10',
      `--pretty=format:${format}`,
      '--name-status',
    ].join(' ');

    output = await this.run(`log ${gitOptions}`);
  } catch (_err) {
    return [];
  }

  return _.chain(output)
    .split(commitSeparator)
    .compact()
    .map((commit) => {
      const [hash, message, status] = _.chain(commit)
        .split(keySeparator)
        .compact()
        .value();
      const changedFiles = this.parseStatus(status);
      return { hash, message, changedFiles };
    })
    .value();
};
// TODO: Allow specifying the number of commits to go back in time
// TODO: Add the commit date
// TODO: Add the commit author
