import { _ } from 'golgoth';

/**
 * Returns the list of tags
 * @returns {Array} List of tags with {name, isCurrent} structure
 **/
export async function tagList() {
  const output = await this.run('tag --sort=-creatordate');
  const current = await this.currentTag();

  return _.chain(output)
    .split('\n')
    .compact()
    .map((name) => {
      const isCurrent = name === current;
      return { name, isCurrent };
    })
    .value();
}
