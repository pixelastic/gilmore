/**
 * Creates a new remote
 * @param {string} remoteName Name of the remote to create
 * @param {string} url URL of the remote
 **/
module.exports = async function (remoteName, url) {
  // Overwrite if remote already exists
  if (await this.remoteExists(remoteName)) {
    await this.setConfig(`remote.${remoteName}.url`, url);
    return;
  }

  const command = `remote add ${remoteName} "${url}"`;
  await this.run(command);
};
