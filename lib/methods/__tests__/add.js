const { emptyDir, tmpDirectory } = require('firost');
const { _ } = require('golgoth');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/status');
const repo = new Gilmore(repoPath);

describe('add', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should add all files by default', async () => {
    await repo.init();
    await repo.newFile('logo.png');
    await repo.newFile('README.md');
    await repo.add();

    const status = await repo.status();
    const actual = _.filter(status, { status: 'added' });
    expect(actual).toHaveLength(2);
  });
  it('should only add the specified files', async () => {
    await repo.init();
    await repo.newFile('logo.png');
    await repo.newFile('README.md');
    await repo.add(['README.md']);

    const status = await repo.status();
    const actual = _.filter(status, { status: 'added' });
    expect(actual).toHaveLength(1);
  });
});
