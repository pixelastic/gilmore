import path from 'node:path';
import { remove } from 'firost';

/**
 * Deletes the file in repo at the specified filepath
 * @param {string} filepath Relative path to the file
 **/
export async function removeFile(filepath) {
  await remove(path.resolve(this.root, filepath));
}
