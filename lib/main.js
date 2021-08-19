const { gitRoot } = require('firost');
const add = require('./methods/add');
const commit = require('./methods/commit');
const currentCommit = require('./methods/currentCommit');
const init = require('./methods/init');
const commitList = require('./methods/commitList');
const newFile = require('./methods/newFile');
const run = require('./methods/run');
const status = require('./methods/status');
const write = require('./methods/write');

module.exports = function (userRoot) {
  const rootPath = userRoot || gitRoot();
  return {
    root: rootPath,
    add,
    commitList,
    commit,
    currentCommit,
    init,
    newFile,
    run,
    status,
    write,
  };
};
