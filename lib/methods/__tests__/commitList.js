const { emptyDir, tmpDirectory } = require('firost');
const { _ } = require('golgoth');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/commitList');
const repo = new Gilmore(repoPath);

describe('commitList', () => {
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

  describe('should return expected keys', () => {
    it.each([
      [
        'hash',
        async () => {
          return await repo.currentCommit();
        },
      ],
      ['message', 'docs: add README'],
      ['changedFiles', [{ status: 'added', name: 'README.md' }]],
    ])('%s', async (key, rawExpected) => {
      await repo.init();
      await repo.newFile('README.md');
      await repo.commitAll('docs: add README');

      const actual = await repo.commitList();

      const expected = _.isFunction(rawExpected)
        ? await rawExpected()
        : rawExpected;

      expect(actual[0]).toHaveProperty(key, expected);
    });
  });
});
