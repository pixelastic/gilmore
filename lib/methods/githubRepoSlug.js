import { _ } from 'golgoth';
import parseGithubRepoUrl from 'parse-github-repo-url';
/**
 * Returns the GitHub repo slug
 * @returns {string} Returns the repo slug from the remote url
 **/
export async function githubRepoSlug() {
  // Find the current remote
  const remoteData = await this.getRemote();
  const remoteUrl = remoteData.url;
  if (!remoteUrl || !_.includes(remoteUrl, 'github.com')) {
    return false;
  }

  // Parse the url as a GitHub one
  const parsedRepoUrl = parseGithubRepoUrl(remoteUrl);
  if (!parsedRepoUrl) {
    return false;
  }

  return [parsedRepoUrl[0], parsedRepoUrl[1]].join('/');
}
