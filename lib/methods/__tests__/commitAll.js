const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/commitAll');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('commitAll', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should commit all changed files', async () => {
    await repo.init();
    await repo.writeFile('my content', 'file.txt');

    await repo.commitAll('add new file');

    const actual = await repo.commitList();
    expect(actual[0]).toHaveProperty('changedFiles', [
      { status: 'added', name: 'file.txt' },
    ]);
    expect(actual[0]).toHaveProperty('subject', 'add new file');
  });
  it('should throw an error if no files to commit', async () => {
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

    const actual = await repo.commitAll('commit message');

    const history = await repo.commitList();
    expect(history[0]).toHaveProperty('hash', actual);
  });
  it('should forward options', async () => {
    await repo.init();
    await repo.newFile('README.md');

    await repo.commitAll('commit message', {
      body: 'commit body',
    });

    const history = await repo.commitList();
    expect(history[0]).toHaveProperty('body', 'commit body');
  });
});
