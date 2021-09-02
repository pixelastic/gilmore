const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/commit');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('commit', () => {
  const envSnapshot = { ...process.env };
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
    process.env = { ...envSnapshot };
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
    expect(actual[0]).toHaveProperty('subject', 'commit message');
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
    it('commits as the local config user', async () => {
      await repo.setConfig('user.name', 'Local');
      await repo.setConfig('user.email', 'local@gloriousgoods.com');

      await repo.commit('commit message');

      const history = await repo.commitList();
      expect(history[0]).toHaveProperty('author.name', 'Local');
      expect(history[0]).toHaveProperty(
        'author.email',
        'local@gloriousgoods.com'
      );
    });
    it('uses GIT_USER_* env vars as fallback to empty local config user', async () => {
      process.env.GIT_USER_NAME = 'Env';
      process.env.GIT_USER_EMAIL = 'env@gloriousgoods.com';

      await repo.commit('commit message');

      const history = await repo.commitList();
      expect(history[0]).toHaveProperty('author.name', 'Env');
      expect(history[0]).toHaveProperty(
        'author.email',
        'env@gloriousgoods.com'
      );
    });
    it('does not use GIT_USER_* env vars if a local config user already exist', async () => {
      process.env.GIT_USER_NAME = 'Env';
      process.env.GIT_USER_EMAIL = 'env@gloriousgoods.com';
      await repo.setConfig('user.name', 'Local');
      await repo.setConfig('user.email', 'local@gloriousgoods.com');

      await repo.commit('commit message');

      const history = await repo.commitList();
      expect(history[0]).toHaveProperty('author.name', 'Local');
      expect(history[0]).toHaveProperty(
        'author.email',
        'local@gloriousgoods.com'
      );
    });
    it('throws an error if no user defined', async () => {
      delete process.env.GIT_USER_NAME;
      delete process.env.GIT_USER_EMAIL;

      let actual;
      try {
        await repo.commit('commit message');
      } catch (err) {
        actual = err;
      }

      expect(actual).toHaveProperty(
        'code',
        'GILMORE_COMMIT_AUTHOR_IDENTITY_UNKNOWN'
      );
    });
  });

  describe('skipCi', () => {
    beforeEach(async () => {
      await repo.init();
      await repo.newFile('README.md');
      await repo.add();
    });

    it('adds [skip ci] to empty body', async () => {
      await repo.commit('commit message', { skipCi: true });

      const history = await repo.commitList();
      expect(history[0]).toHaveProperty('subject', 'commit message');
      expect(history[0]).toHaveProperty('body', '[skip ci]');
    });

    it('adds [skip ci] to existing body', async () => {
      await repo.commit('commit message', {
        body: 'existing body',
        skipCi: true,
      });

      const history = await repo.commitList();
      expect(history[0]).toHaveProperty('subject', 'commit message');
      expect(history[0]).toHaveProperty('body', 'existing body\n\n[skip ci]');
    });
  });
});
