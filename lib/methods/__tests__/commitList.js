const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/commitList');
const repo = new Gilmore(repoPath);

describe('log', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should return an empty array on fresh repo', async () => {
    await repo.init();
    const actual = await repo.commitList();
    expect(actual).toEqual([]);
  });

  it('should return all expected keys', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.add();

    await repo.commit('commit message');
    const hash = await repo.currentCommit();

    const actual = await repo.commitList();
    expect(actual[0]).toHaveProperty('hash', hash);
    expect(actual[0]).toHaveProperty('message', 'commit message');
  });
});
