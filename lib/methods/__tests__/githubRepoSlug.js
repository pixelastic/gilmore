import { emptyDir, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';
const repoPath = tmpDirectory('gilmore/githubRepoSlugSlug');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('githubRepoSlugSlug', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
    await repo.init();
    await repo.writeFile('Documentation', 'README.md');
    await repo.commitAll('Initial commit');
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it('should be false if no remote url', async () => {
    const actual = await repo.githubRepoSlug();
    expect(actual).toEqual(false);
  });
  it('should be false if not a GitHub url', async () => {
    await repo.setRemote('origin', 'git@bitbucket.org:user/repo.git');

    const actual = await repo.githubRepoSlug();
    expect(actual).toEqual(false);
  });
  it('should return the repo', async () => {
    await repo.setRemote('origin', 'git@github.com:user/repo.git');

    const actual = await repo.githubRepoSlug();
    expect(actual).toEqual('user/repo');
  });
});
