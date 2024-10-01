/**
 * Returns a config value
 * @param {string} configKey Config key to read
 * @returns {string} Config value
 **/
export default async function (configKey) {
  try {
    return await this.run(`config ${configKey}`);
  } catch (_err) {
    return null;
  }
}
