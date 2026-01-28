import { remove, tmpDirectory } from 'firost';
import { _ } from 'golgoth';

import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/add');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('add', () => {
  afterEach(async () => {
    await remove(repoPath);
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
    await repo.commit('add only readme');

    const actual = await repo.commitList();
    expect(actual[0]).toHaveProperty('changedFiles', [
      { status: 'added', name: 'README.md' },
    ]);

    const status = await repo.status();
    expect(status[0]).toHaveProperty('name', 'logo.png');
  });
  it('should allow adding only one file as a string', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.add('README.md');
    await repo.commit('add only readme');

    const actual = await repo.commitList();
    expect(actual[0]).toHaveProperty('changedFiles', [
      { status: 'added', name: 'README.md' },
    ]);
  });
});
