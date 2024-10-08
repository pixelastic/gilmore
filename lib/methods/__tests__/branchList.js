import { remove, tmpDirectory } from 'firost';
import { _ } from 'golgoth';

import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/branchList');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('branchList', () => {
  afterEach(async () => {
    await remove(repoPath);
  });
  it('should return the list of all local branches', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    await repo.switchBranch('feature');
    await repo.switchBranch('fix');

    const actual = await repo.branchList();
    const branchNames = _.map(actual, 'name');
    expect(branchNames).toEqual(['feature', 'fix', 'main']);
  });
  it('should mark the current branch', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.commitAll('initial commit');

    await repo.switchBranch('feature');

    const branchList = await repo.branchList();
    const actual = _.find(branchList, { name: 'feature' });
    expect(actual).toHaveProperty('isCurrent', true);
  });
  it('should be empty on clean repo', async () => {
    await repo.init();

    const actual = await repo.branchList();
    expect(actual).toEqual([]);
  });
});
