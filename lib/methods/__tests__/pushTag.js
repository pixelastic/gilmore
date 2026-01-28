import path from 'node:path';
import { remove, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

const testDirectory = tmpDirectory('gilmore/pushTag');
const repoPath = path.resolve(testDirectory, 'repo');
const remotePath = path.resolve(testDirectory, 'remote');
const repo = new Gilmore(repoPath, { globalConfig: false });
const remote = new Gilmore(remotePath, { globalConfig: false });

describe('pushTag', () => {
  beforeEach(async () => {
    await repo.init();
    await repo.writeFile('Documentation', 'README.md');
    await repo.commitAll('initial commit');

    await remote.init({ bare: true });
  });
  afterEach(async () => {
    await remove(testDirectory);
  });
  it('should push current tag to the remote', async () => {
    await repo.setRemote('origin', `file://${remotePath}`);
    await repo.createTag('v1.0.0');

    await repo.pushTag();

    const tagExistsInRemote = await remote.tagExists('v1.0.0');
    expect(tagExistsInRemote).toBe(true);
  });
  it('should do nothing if no current tag', async () => {
    await repo.setRemote('origin', `file://${remotePath}`);

    // Should not throw
    await repo.pushTag();

    const tags = await remote.tagList();
    expect(tags).toEqual([]);
  });
  it('should fail if no current remote', async () => {
    await repo.createTag('v1.0.0');

    let actual;
    try {
      await repo.pushTag();
    } catch (err) {
      actual = err;
    }

    expect(actual).toHaveProperty('code', 'GILMORE_PUSH_TAG_NO_REMOTE');

    const tagExistsInRemote = await remote.tagExists('v1.0.0');
    expect(tagExistsInRemote).toBe(false);
  });
});
