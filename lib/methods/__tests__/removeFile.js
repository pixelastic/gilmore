const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/removeFile');
const repo = new Gilmore(repoPath);

describe('removeFile', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });

  it('should remove a file from the repo', async () => {
    await repo.init();
    await repo.writeFile('# gilmore', 'README.md');
    await repo.commitAll('Add readme');

    await repo.removeFile('README.md');

    const actual = await repo.status();
    expect(actual[0]).toHaveProperty('name', 'README.md');
    expect(actual[0]).toHaveProperty('status', 'deleted');
  });
});
