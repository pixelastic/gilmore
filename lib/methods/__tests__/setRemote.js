const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/setRemote');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('setRemote', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
    await repo.init();
    await repo.writeFile('Documentation', 'README.md');
    await repo.commitAll('Initial commit');
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('creates the new remote with specified url and switch to it', async () => {
    await repo.setRemote('origin', 'git@origin.com');

    const actual = await repo.getRemote();
    expect(actual).toHaveProperty('name', 'origin');
    expect(actual).toHaveProperty('url', 'git@origin.com');
    expect(actual).toHaveProperty('isCurrent', true);
  });
  it('overwrites the url if given', async () => {
    await repo.setRemote('origin', 'git@origin.com');
    await repo.setRemote('origin', 'git@fork.com');

    const actual = await repo.getRemote();
    expect(actual).toHaveProperty('name', 'origin');
    expect(actual).toHaveProperty('url', 'git@fork.com');
    expect(actual).toHaveProperty('isCurrent', true);
  });
  describe('no url give,', () => {
    it('switches to the remote if exists', async () => {
      await repo.createRemote('origin', 'git@origin.com');
      await repo.setRemote('origin');

      const actual = await repo.getRemote();
      expect(actual).toHaveProperty('name', 'origin');
      expect(actual).toHaveProperty('url', 'git@origin.com');
      expect(actual).toHaveProperty('isCurrent', true);
    });
    it('throws an error if the remote does not exist', async () => {
      let actual;
      try {
        await repo.setRemote('origin');
      } catch (err) {
        actual = err;
      }

      expect(actual).toHaveProperty(
        'code',
        'GILMORE_REMOTE_SWITCH_UNKNOWN_REMOTE_NAME'
      );
    });
  });
});
