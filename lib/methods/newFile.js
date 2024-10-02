import path from 'path';
import { newFile } from 'firost';

/**
 * Wrapper around firost.newFile in the current repo
 * @param {string} filepath Relative path to the file
 **/
export default async function (filepath) {
  await newFile(path.resolve(this.root, filepath));
}
