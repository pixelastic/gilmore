/**
 * Returns the GitHub repo name
 * @returns {string} Repo name
 **/
module.exports = async function () {
  const slug = await this.githubRepoSlug();
  if (!slug) {
    return false;
  }
  return slug.split('/')[1];
};
