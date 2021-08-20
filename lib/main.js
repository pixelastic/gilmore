const { gitRoot } = require('firost');
const add = require('./methods/add');
const commit = require('./methods/commit');
const commitAll = require('./methods/commitAll');
const currentCommit = require('./methods/currentCommit');
const init = require('./methods/init');
const commitList = require('./methods/commitList');
const newFile = require('./methods/newFile');
const run = require('./methods/run');
const status = require('./methods/status');
const writeFile = require('./methods/writeFile');
const writeFileJson = require('./methods/writeFileJson');
const readFile = require('./methods/readFile');
const readFileJson = require('./methods/readFileJson');
const parseStatus = require('./methods/parseStatus');
const commitExists = require('./methods/commitExists');

// TODO:
// changedFiles(from, to)
//  => if only from, difference between head and from
//  => if from and to, in the range, no matter which one was first

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

    // Internal / helpers
    newFile,
    parseStatus,
    root: rootPath,
    run,
  };
};
