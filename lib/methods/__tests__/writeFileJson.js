import { remove, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/writeFileJson');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('writeFileJson', () => {
  afterEach(async () => {
    await remove(repoPath);
  });

  it('should write content to a file in the repo', async () => {
    await repo.init();
    await repo.writeFileJson({ name: 'gilmore' }, 'package.json');
    await repo.commitAll('Add package.json');

    const actual = await repo.readFileJson('package.json');
    expect(actual).toHaveProperty('name', 'gilmore');
  });
});
