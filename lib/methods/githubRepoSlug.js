import parseGithubRepoUrl from 'parse-github-repo-url';
/**
 * Returns the GitHub repo slug
 * @returns {string} Returns the repo slug from the remote url
 **/
export async function githubRepoSlug() {
  // Find the current remote
  const remoteData = await this.getRemote();
  if (!remoteData.url) {
    return false;
  }

  // Parse the url as a GitHub one
  const parsedRepoUrl = parseGithubRepoUrl(remoteData.url);
  if (!parsedRepoUrl) {
    return false;
  }

  return [parsedRepoUrl[0], parsedRepoUrl[1]].join('/');
}
