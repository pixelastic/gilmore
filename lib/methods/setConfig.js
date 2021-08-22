/**
 * Sets a config value
 * @param {string} key Config key
 * @param {string} value Config value
 **/
module.exports = async function (key, value) {
  await this.run(`config ${key} ${value}`);
};
