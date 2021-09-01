const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/createRemote');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('createRemote', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
    await repo.init();
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('adds a new remote to the list', async () => {
    await repo.createRemote('origin', 'git@origin.com');

    const actual = await repo.getRemote('origin');
    expect(actual).toHaveProperty('name', 'origin');
    expect(actual).toHaveProperty('url', 'git@origin.com');
    expect(actual).toHaveProperty('isCurrent', false);
  });
  it('overwrites existing url if remote already exists', async () => {
    await repo.createRemote('origin', 'git@origin.com');
    await repo.createRemote('origin', 'git@fork.com');

    const actual = await repo.getRemote('origin');
    expect(actual).toHaveProperty('url', 'git@fork.com');
  });
});
