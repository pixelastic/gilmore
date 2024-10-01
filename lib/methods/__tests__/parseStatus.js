import { emptyDir, tmpDirectory } from 'firost';

import Gilmore from '../../main.js';
const repoPath = tmpDirectory('gilmore/parseStatus');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('add', () => {
  beforeEach(async () => {
    await emptyDir(repoPath);
  });
  afterEach(async () => {
    await emptyDir(repoPath);
  });
  it.each([
    [
      'git log --name-status',
      dedent`

A       added.txt
M       modified.txt
R0790   renamed.txt
D       deleted.txt
    `,

      [
        {
          name: 'added.txt',
          status: 'added',
        },
        {
          name: 'deleted.txt',
          status: 'deleted',
        },
        {
          name: 'modified.txt',
          status: 'modified',
        },
        {
          name: 'renamed.txt',
          status: 'modified',
        },
      ],
    ],
    [
      'git status --short',
      dedent`
AD new-and-staged-and-deleted.txt
AM new-and-staged-and-modified.txt
A  new-and-staged.txt
M  modified-and-staged.txt
 D deleted.txt
 M modified.txt
?? new.txt
    `,

      [
        {
          name: 'deleted.txt',
          status: 'deleted',
        },
        {
          name: 'modified-and-staged.txt',
          status: 'modified',
        },
        {
          name: 'modified.txt',
          status: 'modified',
        },
        {
          name: 'new-and-staged-and-modified.txt',
          status: 'added',
        },
        {
          name: 'new-and-staged.txt',
          status: 'added',
        },
        {
          name: 'new.txt',
          status: 'added',
        },
      ],
    ],
  ])('%s', async (_name, input, expected) => {
    const actual = repo.parseStatus(input);
    expect(actual).toEqual(expected);
  });
});
