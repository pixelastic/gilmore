const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/getRemote');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('getRemote', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
    await repo.init();
    await repo.writeFile('Documentation', 'README.md');
    await repo.commitAll('Initial commit');
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should return false if no such remote', async () => {
    const actual = await repo.getRemote('origin');
    expect(actual).toEqual(false);
  });
  it('should return the name and url of the specified remote', async () => {
    await repo.createRemote('fork', 'git@fork.com');

    const actual = await repo.getRemote('fork');
    expect(actual).toHaveProperty('name', 'fork');
    expect(actual).toHaveProperty('url', 'git@fork.com');
    expect(actual).toHaveProperty('isCurrent', false);
  });
  it('should use the current remote if no argument provided', async () => {
    await repo.setRemote('origin', 'git@origin.com');

    const actual = await repo.getRemote();
    expect(actual).toHaveProperty('name', 'origin');
    expect(actual).toHaveProperty('url', 'git@origin.com');
    expect(actual).toHaveProperty('isCurrent', true);
  });
  it('should set isCurrent to true if this is the current remote', async () => {
    await repo.setRemote('origin', 'git@origin.com');
    await repo.setRemote('fork', 'git@fork.com');

    const actual = await repo.getRemote('fork');
    expect(actual).toHaveProperty('name', 'fork');
    expect(actual).toHaveProperty('url', 'git@fork.com');
    expect(actual).toHaveProperty('isCurrent', true);
  });
});
