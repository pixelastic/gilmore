import { write } from 'firost';
import path from 'path';

/**
 * Wrapper around firost.write in the current repo
 * @param {string} content Content to write to the file
 * @param {string} filepath Relative path to the file
 **/
export default async function (content, filepath) {
  await write(content, path.resolve(this.root, filepath));
};
