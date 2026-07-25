import { remove, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/stagedFilesWithStatus');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('stagedFilesWithStatus', () => {
  beforeEach(async () => {
    await repo.init();
  });
  afterEach(async () => {
    await remove(repoPath);
  });

  it('should return empty array when nothing staged', async () => {
    await repo.newFile('README.md');

    const actual = await repo.stagedFilesWithStatus();

    expect(actual).toEqual([]);
  });

  it('should return renamed entry with name, status, from, and similarity for a staged rename', async () => {
    await repo.newFile('old.js');
    await repo.add('old.js');
    await repo.commit('add old.js');
    // Disable default rename detection so only explicit -M works
    await repo.run('config diff.renames false');
    await repo.run('mv old.js new.js');
    await repo.add();

    const actual = await repo.stagedFilesWithStatus();

    expect(actual).toEqual([
      {
        name: 'new.js',
        status: 'renamed',
        from: 'old.js',
        similarity: 100,
      },
    ]);
  });

  it('should return mixed statuses for multiple staged files', async () => {
    await repo.writeFile('original content', 'old.js');
    await repo.add('old.js');
    await repo.commit('add old.js');
    // Disable default rename detection so only explicit -M works
    await repo.run('config diff.renames false');
    await repo.run('mv old.js renamed.js');
    await repo.writeFile('different content', 'added.js');
    await repo.add();

    const actual = await repo.stagedFilesWithStatus();

    expect(actual).toEqual([
      { name: 'added.js', status: 'added' },
      {
        name: 'renamed.js',
        status: 'renamed',
        from: 'old.js',
        similarity: 100,
      },
    ]);
  });
});
