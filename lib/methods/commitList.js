const { _ } = require('golgoth');
const { uuid } = require('firost');
/**
 * Returns an history of past commits
 * @returns {Array} Array of past commits
 **/
module.exports = async function () {
  const commitSeparator = `__C:${uuid()}__`;
  const keySeparator = `__K:${uuid()}__`;
  const statusSeparator = `__S:${uuid()}__`;

  // Documentation: https://git-scm.com/docs/git-log
  const format = _.join(
    [
      commitSeparator,
      '%h', // hash
      '%s', // subject
      '%b', // body
      '%an', // author name
      '%ae', // author email
    ],
    keySeparator
  );

  let output;
  try {
    const gitOptions = [
      '-n 10',
      `--pretty=format:${format}${statusSeparator}`,
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
      // Status is everything after the status separator
      const rawStatus = _.chain(commit).split(statusSeparator).last().value();
      const changedFiles = this.parseStatus(rawStatus);

      // Formatted line is everything before the status separator, but needs to
      // be splitted along the key separator
      const rawFormat = _.chain(commit)
        .split(statusSeparator)
        .first()
        .split(keySeparator)
        .tail()
        .value();
      const [hash, subject, body, authorName, authorEmail] = rawFormat;

      return {
        hash,
        subject,
        body: _.trim(body),
        changedFiles,
        author: {
          name: authorName,
          email: authorEmail,
        },
      };
    })
    .value();
};
