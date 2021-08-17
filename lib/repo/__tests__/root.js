const current = require('../root');
const path = require('path');
const { write, read, tmpDirectory, exists } = require('firost');

describe('root', () => {
  it('should return the current git root folder', async () => {
    const actual = current();
    const hasGitFolder = await exists(path.resolve(actual, '.git'));
    expect(hasGitFolder).toEqual(true);
  });
  describe('with a reference', () => {
    it('as a directory', async () => {
      const gitRoot = tmpDirectory('gilmore/repo/root');
      await write('good', path.resolve(gitRoot, '.git', 'read-me'));

      const actual = current(path.resolve(gitRoot, 'some/sub/directory'));
      const fileContent = await read(path.resolve(actual, '.git', 'read-me'));
      expect(fileContent).toEqual('good');
    });
    it('as a file', async () => {
      const gitRoot = tmpDirectory('gilmore/repo/root');
      await write('good', path.resolve(gitRoot, '.git', 'read-me'));

      const actual = current(
        path.resolve(gitRoot, 'some/sub/directory/somefile.png')
      );
      const fileContent = await read(path.resolve(actual, '.git', 'read-me'));
      expect(fileContent).toEqual('good');
    });
  });
});
