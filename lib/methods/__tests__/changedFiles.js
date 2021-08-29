const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/changedFiles');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('changedFiles', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });

  it('should return all files changed between two commits', async () => {
    await repo.init();
    await repo.writeFile('one', 'one.txt');
    await repo.writeFile('two', 'two.txt');
    await repo.writeFile('three', 'three.txt');
    const initialCommit = await repo.commitAll('Initial commit');

    await repo.writeFile('This is modified', 'one.txt');
    await repo.removeFile('two.txt');
    await repo.writeFile('This is added', 'four.txt');
    const currentCommit = await repo.commitAll('Modifications');

    const actual = await repo.changedFiles(initialCommit, currentCommit);
    const expected = [
      { name: 'four.txt', status: 'added' },
      { name: 'one.txt', status: 'modified' },
      { name: 'two.txt', status: 'deleted' },
    ];
    expect(actual).toEqual(expected);
  });
  it('should compare to HEAD if no toCommit specified', async () => {
    await repo.init();
    await repo.writeFile('one', 'one.txt');
    const initialCommit = await repo.commitAll('Initial commit');

    await repo.writeFile('This is modified', 'one.txt');
    await repo.commitAll('Modifications');

    await repo.writeFile('And an uncommited change', 'one.txt');

    const actual = await repo.changedFiles(initialCommit);
    const expected = [{ name: 'one.txt', status: 'modified' }];
    expect(actual).toEqual(expected);
  });
  it('should accept reversed order of commits', async () => {
    await repo.init();
    await repo.writeFile('one', 'one.txt');
    const initialCommit = await repo.commitAll('Initial commit');

    await repo.writeFile('This is modified', 'one.txt');
    const finalCommit = await repo.commitAll('Modifications');

    const actual = await repo.changedFiles(initialCommit, finalCommit);
    const reverseActual = await repo.changedFiles(finalCommit, initialCommit);
    expect(actual).toEqual(reverseActual);
  });
  it('should squash changes together', async () => {
    await repo.init();
    await repo.writeFile('one', 'one.txt');
    await repo.writeFile('two', 'two.txt');
    await repo.writeFile('three', 'three.txt');
    const initialCommit = await repo.commitAll('Initial commit');

    await repo.writeFile('This is modified', 'one.txt');
    await repo.removeFile('two.txt');
    await repo.writeFile('This is added', 'four.txt');
    await repo.commitAll('Modifications');

    await repo.writeFile('one', 'one.txt');
    await repo.writeFile('two', 'two.txt');
    await repo.removeFile('four.txt');
    await repo.commitAll('Reverting');

    const actual = await repo.changedFiles(initialCommit);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});
