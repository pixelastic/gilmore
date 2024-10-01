/**
 * Creates a new remote, and switch to it
 * @param {string} name Name of the remote to create
 * @param {string} url URL of the remote
 **/
export default async function (name, url) {
  // Only a name given, we switch to this remote
  if (!url) {
    await this.switchRemote(name);
    return;
  }

  await this.createRemote(name, url);
  await this.switchRemote(name);
};
