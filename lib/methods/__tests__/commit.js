const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/commit');
const repo = new Gilmore(repoPath);

describe('commit', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should commit all staged files', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.add();

    await repo.commit('commit message');

    const actual = await repo.status();
    expect(actual).toEqual([]);
  });

  it('should save the commit message', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.add();

    await repo.commit('commit message');

    const actual = await repo.log();
    expect(actual[0]).toHaveProperty('message', 'commit message');
  });
});
