import { remove, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/switchRemote');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('switchRemote', () => {
  beforeEach(async () => {
    await repo.init();
    await repo.writeFile('Documentation', 'README.md');
    await repo.commitAll('Initial commit');
  });
  afterEach(async () => {
    await remove(repoPath);
  });
  it('changes the current remote', async () => {
    expect(await repo.currentRemoteName()).toBe(false);

    await repo.createRemote('fork', 'git@fork.com');
    expect(await repo.currentRemoteName()).toBe(false);

    await repo.switchRemote('fork');
    expect(await repo.currentRemoteName()).toBe('fork');
  });
  it('throws an error if the remote does not exist', async () => {
    let actual;
    try {
      await repo.switchRemote('nope');
    } catch (err) {
      actual = err;
    }
    expect(actual).toHaveProperty(
      'code',
      'GILMORE_REMOTE_SWITCH_UNKNOWN_REMOTE_NAME',
    );
  });
});
