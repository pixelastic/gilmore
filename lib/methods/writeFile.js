import path from 'node:path';
import { write } from 'firost';

/**
 * Wrapper around firost.write in the current repo
 * @param {string} content Content to write to the file
 * @param {string} filepath Relative path to the file
 **/
export async function writeFile(content, filepath) {
  await write(content, path.resolve(this.root, filepath));
}
