import { parseNameStatus } from '../helper.js';

describe('parseNameStatus', () => {
  describe('Parsing non-rename statuses', () => {
    it.each([
      {
        title: 'added/modified/deleted statuses from --name-status input',
        input: ['A\tadded.txt', 'M\tmodified.txt', 'D\tdeleted.txt'].join('\n'),
        expected: [
          { name: 'added.txt', status: 'added' },
          { name: 'deleted.txt', status: 'deleted' },
          { name: 'modified.txt', status: 'modified' },
        ],
      },
      {
        title: 'filters out false-mapped statuses (AD)',
        input: ['A\tstaged.txt', 'AD\tstaged-then-deleted.txt'].join('\n'),
        expected: [{ name: 'staged.txt', status: 'added' }],
      },
      {
        title: 'sorts results by name',
        input: ['A\tzebra.txt', 'A\talpha.txt', 'A\tmiddle.txt'].join('\n'),
        expected: [
          { name: 'alpha.txt', status: 'added' },
          { name: 'middle.txt', status: 'added' },
          { name: 'zebra.txt', status: 'added' },
        ],
      },
    ])('$title', ({ input, expected }) => {
      const actual = parseNameStatus(input);
      expect(actual).toEqual(expected);
    });
  });

  describe('Parsing renames', () => {
    it.each([
      {
        title: 'R079 two-path input',
        input: 'R079\told-name.txt\tnew-name.txt',
        expected: [
          {
            name: 'new-name.txt',
            status: 'renamed',
            from: 'old-name.txt',
            similarity: 79,
          },
        ],
      },
      {
        title: 'R100 similarity',
        input: 'R100\told.txt\tnew.txt',
        expected: [
          {
            name: 'new.txt',
            status: 'renamed',
            from: 'old.txt',
            similarity: 100,
          },
        ],
      },
      {
        title:
          'omits from and similarity from non-rename entries in mixed output',
        input: ['A\tadded.txt', 'R079\told.txt\trenamed.txt'].join('\n'),
        expected: [
          { name: 'added.txt', status: 'added' },
          {
            name: 'renamed.txt',
            status: 'renamed',
            from: 'old.txt',
            similarity: 79,
          },
        ],
      },
    ])('$title', ({ input, expected }) => {
      const actual = parseNameStatus(input);
      expect(actual).toEqual(expected);
    });
  });

  describe('Unknown symbols', () => {
    it('should pass unknown symbols through as-is', () => {
      const input = 'Z\tmystery.txt';

      const actual = parseNameStatus(input);
      const expected = [{ name: 'mystery.txt', status: 'Z' }];
      expect(actual).toEqual(expected);
    });
  });
});
