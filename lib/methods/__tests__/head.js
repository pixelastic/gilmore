const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/head');
const repo = new Gilmore(repoPath);

describe('head', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should change after each commit', async () => {
    await repo.init();

    await repo.newFile('README.md');
    await repo.add();
    await repo.commit('add readme');
    const currentCommit = await repo.head();

    await repo.newFile('LICENSE.txt');
    await repo.add();
    await repo.commit('add license');
    const actual = await repo.head();

    expect(currentCommit).not.toEqual(actual);
  });
  it('should return false if not in a git repo', async () => {
    await repo.newFile('README.md');
    const actual = await repo.head();

    expect(actual).toEqual(false);
  });
});
