const { gitRoot } = require('firost');
const add = require('./methods/add');
const commit = require('./methods/commit');
const head = require('./methods/head');
const init = require('./methods/init');
const log = require('./methods/log');
const newFile = require('./methods/newFile');
const run = require('./methods/run');
const status = require('./methods/status');
const write = require('./methods/write');

module.exports = function (userRoot) {
  const rootPath = userRoot || gitRoot();
  return {
    root: rootPath,
    add,
    commit,
    head,
    init,
    log,
    newFile,
    run,
    status,
    write,
  };
};
