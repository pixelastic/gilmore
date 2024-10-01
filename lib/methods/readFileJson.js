/**
 * Returns the parsed JSON content of a file at a specific commit
 * @param {string} filepath Relative path to the file
 * @param {string} commit Reference to the commit
 * @returns {boolean|object} Content of the JSON file, or false if file missing
 **/
export default async function (filepath, commit) {
  // Attempt to read the file
  const content = await this.readFile(filepath, commit);

  if (!content) {
    return content;
  }

  // Attempt to parse the JSON
  try {
    return JSON.parse(content);
  } catch (_err) {
    return false;
  }
};
