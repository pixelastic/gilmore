import { gitRoot } from 'firost';

import { add } from './methods/add.js';
import { branchExists } from './methods/branchExists.js';
import { branchList } from './methods/branchList.js';
import { changedFiles } from './methods/changedFiles.js';
import { commitAll } from './methods/commitAll.js';
import { commitExists } from './methods/commitExists.js';
import { commitList } from './methods/commitList.js';
import { commit } from './methods/commit.js';
import { createRemote } from './methods/createRemote.js';
import { createTag } from './methods/createTag.js';
import { currentTag } from './methods/currentTag.js';
import { currentBranchName } from './methods/currentBranchName.js';
import { currentCommit } from './methods/currentCommit.js';
import { currentRemoteName } from './methods/currentRemoteName.js';
import { deleteConfig } from './methods/deleteConfig.js';
import { getConfig } from './methods/getConfig.js';
import { getRemote } from './methods/getRemote.js';
import { githubRepoName } from './methods/githubRepoName.js';
import { githubRepoOwner } from './methods/githubRepoOwner.js';
import { githubRepoSlug } from './methods/githubRepoSlug.js';
import { init } from './methods/init.js';
import { newFile } from './methods/newFile.js';
import { parseStatus } from './methods/parseStatus.js';
import { push } from './methods/push.js';
import { pushBranch } from './methods/pushBranch.js';
import { readFileJson } from './methods/readFileJson.js';
import { readFile } from './methods/readFile.js';
import { remoteExists } from './methods/remoteExists.js';
import { remoteList } from './methods/remoteList.js';
import { removeFile } from './methods/removeFile.js';
import { renameBranch } from './methods/renameBranch.js';
import { run } from './methods/run.js';
import { setConfig } from './methods/setConfig.js';
import { setRemote } from './methods/setRemote.js';
import { status } from './methods/status.js';
import { switchBranch } from './methods/switchBranch.js';
import { switchRemote } from './methods/switchRemote.js';
import { tagExists } from './methods/tagExists.js';
import { tagList } from './methods/tagList.js';
import { writeFileJson } from './methods/writeFileJson.js';
import { writeFile } from './methods/writeFile.js';

/**
 * Instanciate a Gilmore repo instance
 * @param {string} userRoot Path to the repo root
 * @param {object} userOptions Additional options to the repo
 * @param {boolean} userOptions.globalConfig Defaults to true. Set to false
 * to not use default config stored in ~/.gitconfig
 * @returns {object} Gilmore repo object
 **/
export default function Gilmore(userRoot, userOptions = {}) {
  const rootPath = userRoot || gitRoot();
  const options = {
    globalConfig: true,
    ...userOptions,
  };
  return {
    // Actions
    init,
    add,
    commit,
    commitAll,
    status,
    push,
    pushBranch,

    // Files
    readFile,
    readFileJson,
    writeFile,
    writeFileJson,
    removeFile,

    // Commits
    currentCommit,
    commitList,
    commitExists,
    changedFiles,

    // Branches
    currentBranchName,
    branchList,
    branchExists,
    switchBranch,
    renameBranch,

    // Tags
    currentTag,
    tagList,
    createTag,
    tagExists,

    // Remotes
    currentRemoteName,
    remoteList,
    remoteExists,
    getRemote,
    createRemote,
    switchRemote,
    setRemote,

    // Config
    getConfig,
    setConfig,
    deleteConfig,

    // GitHub
    githubRepoSlug,
    githubRepoOwner,
    githubRepoName,

    // Helpers
    root: rootPath,
    options,
    run,

    // Internals
    parseStatus,
    newFile,
  };
}
