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

module.exports = function (userRoot) {
  const rootPath = userRoot || gitRoot();
  return {
    // Actions
    add,
    commitAll,
    commit,
    init,
    status,

    // Commits
    commitList,
    currentCommit,
    commitExists,

    // Files
    readFile,
    readFileJson,
    writeFile,
    writeFileJson,
    removeFile,
    changedFiles,

    // Internal / helpers
    newFile,
    parseStatus,
    root: rootPath,
    run,
  };
};
