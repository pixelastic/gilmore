/**
 * Returns a config value
 * @param {string} configKey Config key to read
 * @returns {string} Config value
 **/
export async function getConfig(configKey) {
  try {
    return await this.run(`config ${configKey}`);
  } catch (_err) {
    return null;
  }
}
