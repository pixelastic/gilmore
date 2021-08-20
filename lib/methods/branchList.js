const { _ } = require('golgoth');

/**
 * Returns the list of branches
 * @returns {Array} List of branches
 **/
module.exports = async function () {
  const output = await this.run('branch');
  return _.chain(output)
    .split('\n')
    .map((line) => {
      const isCurrent = _.startsWith(line, '*');
      const name = _.chain(line).replace(/^\*/, '').trim().value();
      return { name, isCurrent };
    })
    .value();
};
