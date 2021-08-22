/**
 * Returns a config value
 * @param {string} key Config key to read
 * @returns {string} Config value
 **/
module.exports = async function (key) {
  try {
    return await this.run(`config ${key}`);
  } catch (_err) {
    return null;
  }
};
