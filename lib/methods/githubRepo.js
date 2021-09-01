const parseGithubRepoUrl = require('parse-github-repo-url');
/**
 * Returns the GitHub repo
 * @returns {string} Returns the repo part of the GitHub url
 **/
module.exports = async function () {
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

  return parsedRepoUrl[1];
};
