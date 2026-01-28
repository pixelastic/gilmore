import { _ } from 'golgoth';
import { remove, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/commitList');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('commitList', () => {
  afterEach(async () => {
    await remove(repoPath);
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
      ['subject', 'docs: add README'],
      ['body', 'more body'],
      ['changedFiles', [{ status: 'added', name: 'README.md' }]],
      ['author.name', 'Gilmore'],
      ['author.email', 'gilmore@gloriousgoods.com'],
    ])('%s', async (key, rawExpected) => {
      await repo.init();
      await repo.newFile('README.md');
      await repo.commitAll('docs: add README', { body: 'more body' });

      const actual = await repo.commitList();

      const expected = _.isFunction(rawExpected)
        ? await rawExpected()
        : rawExpected;

      expect(actual[0]).toHaveProperty(key, expected);
    });
  });
});
