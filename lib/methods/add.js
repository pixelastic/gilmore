import { _ } from 'golgoth';

/**
 * Add files to the staging area
 * @param {Array} files List of files to add. Leave it empty to add all files
 **/
export async function add(files = []) {
  const fileArgument = _.isEmpty(files) ? '-A' : files.join(' ');

  await this.run(`add ${fileArgument}`);
}
