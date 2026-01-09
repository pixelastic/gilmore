/**
 * Create a new tag
 * @param {string} tagName Name of the tag to create
 **/
export async function createTag(tagName) {
  await this.run(`tag ${tagName}`);
}
