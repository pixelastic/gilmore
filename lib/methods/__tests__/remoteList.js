import { remove, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/remoteList');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('remoteList', () => {
  beforeEach(async () => {
    await repo.init();
    await repo.writeFile('Documentation', 'README.md');
    await repo.commitAll('Initial commit');
  });
  afterEach(async () => {
    await remove(repoPath);
  });
  it('should be empty if no remote defined', async () => {
    const actual = await repo.remoteList();
    expect(actual).toEqual([]);
  });
  it('should return the list of all remotes', async () => {
    await repo.setRemote('keyleth', 'git@keyleth.com');
    await repo.createRemote('pike', 'git@pike.com');
    await repo.createRemote('grog', 'git@grog.com');

    const actual = await repo.remoteList();
    expect(actual).toEqual([
      {
        name: 'grog',
        url: 'git@grog.com',
        isCurrent: false,
      },
      {
        name: 'keyleth',
        url: 'git@keyleth.com',
        isCurrent: true,
      },
      {
        name: 'pike',
        url: 'git@pike.com',
        isCurrent: false,
      },
    ]);
  });
});
