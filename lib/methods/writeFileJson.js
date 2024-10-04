import path from 'path';
import { writeJson } from 'firost';

/**
 * Wrapper around firost.writeJson in the current repo
 * @param {string} content Content to write to the file
 * @param {string} filepath Relative path to the file
 **/
export default async function (content, filepath) {
  await writeJson(content, path.resolve(this.root, filepath));
}
