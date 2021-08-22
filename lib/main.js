const { gitRoot } = require('firost');
const add = require('./methods/add');
const commitAll = require('./methods/commitAll');
const commitExists = require('./methods/commitExists');
const commitList = require('./methods/commitList');
const commit = require('./methods/commit');
const currentCommit = require('./methods/currentCommit');
const init = require('./methods/init');
const newFile = require('./methods/newFile');
const parseStatus = require('./methods/parseStatus');
const readFileJson = require('./methods/readFileJson');
const readFile = require('./methods/readFile');
const run = require('./methods/run');
const status = require('./methods/status');
const writeFileJson = require('./methods/writeFileJson');
const writeFile = require('./methods/writeFile');
const changedFiles = require('./methods/changedFiles');
const removeFile = require('./methods/removeFile');
const currentBranch = require('./methods/currentBranch');
const switchBranch = require('./methods/switchBranch');
const branchList = require('./methods/branchList');
const branchExists = require('./methods/branchExists');
const getConfig = require('./methods/getConfig');
const setConfig = require('./methods/setConfig');

module.exports = function (userRoot) {
  const rootPath = userRoot || gitRoot();
  return {
    // Actions
    init,
    add,
    commit,
    commitAll,
    status,

    // Commits
    currentCommit,
    commitList,
    commitExists,
    changedFiles,

    // Files
    readFile,
    readFileJson,
    writeFile,
    writeFileJson,
    removeFile,

    // Branches
    currentBranch,
    branchList,
    branchExists,
    switchBranch,

    // Config
    getConfig,
    setConfig,

    // Helpers
    root: rootPath,
    run,

    // Internals
    parseStatus,
    newFile,
  };
};
