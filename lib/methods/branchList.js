import { _ } from 'golgoth';

/**
 * Returns the list of branches
 * @returns {Array} List of branches
 **/
export async function branchList() {
  const output = await this.run('branch');
  return _.chain(output)
    .split('\n')
    .compact()
    .map((line) => {
      const isCurrent = _.startsWith(line, '*');
      const name = _.chain(line).replace(/^\*/, '').trim().value();
      return { name, isCurrent };
    })
    .value();
}
