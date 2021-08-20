const { emptyDir, tmpDirectory } = require('firost');

const Gilmore = require('../../main');
const repoPath = tmpDirectory('gilmore/readFileJson');
const repo = new Gilmore(repoPath);

describe('readFile', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  // TODO: Should allow reading files with absolute path

  it('should return the content of the file at the specified commit', async () => {
    await repo.init();
    await repo.writeFileJson({ name: 'gilmore' }, 'package.json');
    const commit = await repo.commitAll();

    const actual = await repo.readFileJson('package.json', commit);
    expect(actual).toHaveProperty('name', 'gilmore');
  });
  it('should return false if no such file', async () => {
    await repo.init();
    await repo.writeFileJson({ name: 'gilmore' }, 'package.json');
    const commit = await repo.commitAll();

    const actual = await repo.readFileJson('jest.config.json', commit);
    expect(actual).toEqual(false);
  });
  it('should return false if the file is not a valid JSON', async () => {
    await repo.init();
    await repo.writeFile('not a json content', 'package.json');
    const commit = await repo.commitAll();

    const actual = await repo.readFileJson('package.json', commit);
    expect(actual).toEqual(false);
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
      expect(actual).toEqual(false);
    });
  });
});
