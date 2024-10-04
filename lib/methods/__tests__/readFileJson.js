import { remove, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/readFileJson');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('readFile', () => {
  afterEach(async () => {
    await remove(repoPath);
  });
  // TODO: Should allow reading files with absolute path

  it('should return the content of the file at the specified commit', async () => {
    await repo.init();
    await repo.writeFileJson({ name: 'gilmore' }, 'package.json');
    const commit = await repo.commitAll('initial commit');
    const actual = await repo.readFileJson('package.json', commit);
    expect(actual).toHaveProperty('name', 'gilmore');
  });
  it('should return false if no such file', async () => {
    await repo.init();
    await repo.writeFileJson({ name: 'gilmore' }, 'package.json');
    const commit = await repo.commitAll();

    const actual = await repo.readFileJson('jest.config.json', commit);
    expect(actual).toBe(false);
  });
  it('should return false if the file is not a valid JSON', async () => {
    await repo.init();
    await repo.writeFile('not a json content', 'package.json');
    const commit = await repo.commitAll();

    const actual = await repo.readFileJson('package.json', commit);
    expect(actual).toBe(false);
  });
  describe('no commit specified', () => {
    it('should return the current content if no commit specified', async () => {
      await repo.init();
      await repo.writeFileJson({ name: 'gilmore' }, 'package.json');

      const actual = await repo.readFileJson('package.json');
      expect(actual).toHaveProperty('name', 'gilmore');
    });
    it('should return false if no such file', async () => {
      await repo.init();
      const actual = await repo.readFileJson('jest.config.json');
      expect(actual).toBe(false);
    });
  });
});
