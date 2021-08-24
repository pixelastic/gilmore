const { gitRoot } = require('firost');
const add = require('./methods/add');
const branchExists = require('./methods/branchExists');
const branchList = require('./methods/branchList');
const changedFiles = require('./methods/changedFiles');
const commitAll = require('./methods/commitAll');
const commitExists = require('./methods/commitExists');
const commitList = require('./methods/commitList');
const commit = require('./methods/commit');
const currentBranch = require('./methods/currentBranch');
const currentCommit = require('./methods/currentCommit');
const deleteConfig = require('./methods/deleteConfig');
const getConfig = require('./methods/getConfig');
const init = require('./methods/init');
const newFile = require('./methods/newFile');
const parseStatus = require('./methods/parseStatus');
const readFileJson = require('./methods/readFileJson');
const readFile = require('./methods/readFile');
const removeFile = require('./methods/removeFile');
const run = require('./methods/run');
const setConfig = require('./methods/setConfig');
const status = require('./methods/status');
const switchBranch = require('./methods/switchBranch');
const writeFileJson = require('./methods/writeFileJson');
const writeFile = require('./methods/writeFile');

/**
 * Instanciate a Gilmore repo instance
 * @param {string} userRoot Path to the repo root
 * @param {object} userOptions Additional options to the repo
 * @param {boolean} userOptions.globalConfig Defaults to true. Set to false
 * to not use default config stored in ~/.gitconfig
 * @returns {object} Gilmore repo object
 **/
module.exports = function (userRoot, userOptions = {}) {
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
    deleteConfig,

    // Helpers
    root: rootPath,
    options,
    run,

    // Internals
    parseStatus,
    newFile,
  };
};
