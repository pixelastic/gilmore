import { remove, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/currentTag');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('currentTag', () => {
  beforeEach(async () => {
    await repo.init();
  });
  afterEach(async () => {
    await remove(repoPath);
  });
  it('should return the tag on the current commit', async () => {
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');
    await repo.createTag('v1.0.0');

    const actual = await repo.currentTag();
    expect(actual).toEqual('v1.0.0');
  });
  it('should return false if no tag exists', async () => {
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    const actual = await repo.currentTag();
    expect(actual).toBe(false);
  });
  it('should return the closest tag if on a commit after the tag', async () => {
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');
    await repo.createTag('v1.0.0');

    await repo.newFile('file.txt');
    await repo.commitAll('second commit');

    const actual = await repo.currentTag();
    expect(actual).toEqual('v1.0.0');
  });
  it('should return the closest tag if several tags', async () => {
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');
    await repo.createTag('v1.0.0');

    await repo.newFile('changelog.md');
    await repo.commitAll('add changelog');
    await repo.createTag('v1.0.1');

    await repo.newFile('file.txt');
    await repo.commitAll('last commit');

    const actual = await repo.currentTag();
    expect(actual).toEqual('v1.0.1');
  });
});
