import { remove } from 'firost';
import path from 'path';

/**
 * Deletes the file in repo at the specified filepath
 * @param {string} filepath Relative path to the file
 **/
export default async function (filepath) {
  await remove(path.resolve(this.root, filepath));
};
