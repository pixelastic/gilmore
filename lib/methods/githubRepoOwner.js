/**
 * Returns the GitHub repo owner
 * @returns {string} Repo owner name
 **/
module.exports = async function () {
  const slug = await this.githubRepoSlug();
  if (!slug) {
    return false;
  }
  return slug.split('/')[0];
};
