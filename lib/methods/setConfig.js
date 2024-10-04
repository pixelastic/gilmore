/**
 * Sets a config value
 * @param {string} key Config key
 * @param {string} value Config value
 **/
export default async function (key, value) {
  await this.run(`config ${key} ${value}`);
}
