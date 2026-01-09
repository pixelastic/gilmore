import path from 'node:path';
import { newFile as firostNewFile } from 'firost';

/**
 * Wrapper around firost.newFile in the current repo
 * @param {string} filepath Relative path to the file
 **/
export async function newFile(filepath) {
  await firostNewFile(path.resolve(this.root, filepath));
}
