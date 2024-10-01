import { emptyDir, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';
const repoPath = tmpDirectory('gilmore/status');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('status', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should be empty on clean repo', async () => {
    await repo.init();
    const actual = await repo.status();
    expect(actual).toEqual([]);
  });
  it('should return false if not in a repo', async () => {
    const actual = await repo.status();
    expect(actual).toEqual(false);
  });
  it('new file => new', async () => {
    await repo.init();
    await repo.writeFile('please read me', 'README.md');
    const actual = await repo.status();
    expect(actual).toEqual([{ status: 'added', name: 'README.md' }]);
  });
  it('new file in staging => added', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.add();
    const actual = await repo.status();
    expect(actual).toEqual([{ status: 'added', name: 'README.md' }]);
  });
  it('existing file modified => updated', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('save readme');
    await repo.writeFile('updated readme', 'README.md');
    const actual = await repo.status();
    expect(actual).toEqual([{ status: 'modified', name: 'README.md' }]);
  });
  it('new file added then updated', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.add();
    await repo.writeFile('updated readme', 'README.md');
    const actual = await repo.status();
    expect(actual).toEqual([{ status: 'added', name: 'README.md' }]);
  });
});
