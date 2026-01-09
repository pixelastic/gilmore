import { _, pMap } from 'golgoth';

/**
 * Returns the list of remotes
 * @returns {Array} List of remotes, with data similar to what getRemote is
 * returning
 **/
export async function remoteList() {
  const output = await this.run('remote');
  const remoteNames = _.chain(output).split('\n').compact().value();
  return await pMap(remoteNames, async (remoteName) => {
    return await this.getRemote(remoteName);
  });
}
