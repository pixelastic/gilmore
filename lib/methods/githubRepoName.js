/**
 * Returns the GitHub repo name
 * @returns {string} Repo name
 **/
export default async function () {
  const slug = await this.githubRepoSlug();
  if (!slug) {
    return false;
  }
  return slug.split('/')[1];
}
