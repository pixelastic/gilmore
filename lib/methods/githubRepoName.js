/**
 * Returns the GitHub repo name
 * @returns {string} Repo name
 **/
export async function githubRepoName() {
  const slug = await this.githubRepoSlug();
  if (!slug) {
    return false;
  }
  return slug.split('/')[1];
}
