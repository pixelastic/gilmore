import { _ } from 'golgoth';

export let __;

const symbolMapping = {
  A: 'added',
  C: 'added',
  '??': 'added',

  M: 'modified',
  T: 'modified',

  D: 'deleted',

  U: 'unmerged',
  X: 'unknown',
  B: 'broken',

  AD: false,
  AM: 'added',
};

/**
 * Returns a list of all new/added/modified/deleted files, much like git status
 * @returns {Array} List of changed files with their name and status
 **/
export async function status() {
  try {
    const output = await this.run('status --short');
    if (!output) {
      return [];
    }

    return __.parseShortStatus(output);
  } catch (_err) {
    return false;
  }
}

__ = {
  /**
   * Parses git status --short output into a list of changed files
   * @param {string} input Raw --short output string
   * @returns {Array} List of objects with name, status, and optional from
   */
  parseShortStatus(input) {
    return _.chain(input)
      .split('\n')
      .compact()
      .map((line) => {
        const split = _.chain(line).split(/\s/).compact().value();
        const symbol = split[0];

        // Renamed files: R  old.txt -> new.txt
        if (symbol === 'R' && split[2] === '->') {
          return {
            name: split[3],
            status: 'renamed',
            from: split[1],
          };
        }

        const name = _.chain(split).tail().compact().join('').value();
        const mappedStatus = _.has(symbolMapping, symbol)
          ? symbolMapping[symbol]
          : symbol;

        return { name, status: mappedStatus };
      })
      .reject({ status: false })
      .sortBy('name')
      .value();
  },
};
