/**
 * Deletes a config key
 * @param {string} key Config key to delete
 * @returns {boolean} True on success, false on error
 **/
export async function deleteConfig(key) {
  let matchInKey;
  let matchInSection;

  // Maybe it's a key.subkey exact match?
  try {
    await this.run(`config --unset ${key}`);
    matchInKey = true;
  } catch (_err) {
    matchInKey = false;
  }

  // Maybe it's a top-level section?
  try {
    await this.run(`config --remove-section ${key}`);
    matchInSection = true;
  } catch (_err) {
    matchInSection = false;
  }

  return matchInKey || matchInSection;
}
