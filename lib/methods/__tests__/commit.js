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

  describe('commit author', () => {
    beforeEach(async () => {
      await repo.init();
      await repo.newFile('README.md');
      await repo.add();
    });
    it('uses GIT_AUTHOR_NAME and GIT_AUTHOR_EMAIL', async () => {
      await repo.commit('commit message');

      const history = await repo.commitList();
      expect(history[0]).toHaveProperty('author.name', 'Gilmore');
      expect(history[0]).toHaveProperty(
        'author.email',
        'gilmore@gloriousgoods.com'
      );
    });
    it('uses the repo user.name and user.email if no ENV vars', async () => {
      const envBackup = { ...process.env };
      delete process.env.GIT_AUTHOR_NAME;
      delete process.env.GIT_AUTHOR_EMAIL;

      await repo.setConfig('user.name', 'Hotis');
      await repo.setConfig('user.email', 'hotis@gloriousgoods.com');

      await repo.commit('commit message');

      const history = await repo.commitList();
      expect(history[0]).toHaveProperty('author.name', 'Hotis');
      expect(history[0]).toHaveProperty(
        'author.email',
        'hotis@gloriousgoods.com'
      );

      process.env = envBackup;
    });
    it('throws an error if global config disabled', async () => {
      const repoWithoutGlobalConfig = new Gilmore(repoPath, {
        globalConfig: false,
      });
      let actual;
      try {
        await repoWithoutGlobalConfig.commit('commit message');
      } catch (err) {
        actual = err;
      }

      expect(actual).toHaveProperty(
        'code',
        'GILMORE_COMMIT_AUTHOR_IDENTITY_UNKNOWN'
      );
    });
  });
});
