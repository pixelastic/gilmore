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

    const actual = await repo.commitList();
    expect(actual[0]).toHaveProperty('message', 'commit message');
  });

  it('should throw an error if there are no files to commit', async () => {
    await repo.init();

    let actual;
    try {
      await repo.commitAll();
    } catch (err) {
      actual = err;
    }

    expect(actual).toHaveProperty('code', 'GILMORE_COMMIT_NOTHING_TO_COMMIT');
  });

  it('should return the commit hash', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.add();

    const actual = await repo.commit('commit message');

    const history = await repo.commitList();
    expect(history[0]).toHaveProperty('hash', actual);
  });
});