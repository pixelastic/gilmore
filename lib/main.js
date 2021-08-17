const { gitRoot } = require('firost');
const add = require('./methods/add');
const commit = require('./methods/commit');
const status = require('./methods/status');
const head = require('./methods/head');
const init = require('./methods/init');
const newFile = require('./methods/newFile');
const write = require('./methods/write');
const run = require('./methods/run');

module.exports = function (userRoot) {
  const rootPath = userRoot || gitRoot();
  return {
    root: rootPath,
    add,
    status,
    init,
    run,
    commit,
    write,
    head,
    newFile,
  };
};
