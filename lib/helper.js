import { _ } from 'golgoth';

const symbolMapping = {
  A: 'added',
  C: 'added', // Copy of an existing file
  '??': 'added', // Only in the staging area

  M: 'modified',
  T: 'modified', // type change (symlink, etc)
  R: 'modified', // renamed

  D: 'deleted',

  U: 'unmerged',
  X: 'unknown',
  B: 'broken',

  AD: false, // Creating a file, adding to staging, then deleting
  AM: 'added', // Adding a file, adding to staging, modifying it
};

/**
 * Parses a string status output into a list of changed files
 * @param {string} input String status list
 * @returns {Array} List of changed files with their path and type, or false if
 * an error occured
 **/
export function parseStatus(input) {
  return _.chain(input)
    .split('\n')
    .compact()
    .map((line) => {
      const split = _.chain(line).split(/\s/).compact().value();

      const name = _.chain(split).tail().compact().join('').value();

      const status = _.chain(split)
        .first()
        .thru((symbol) => {
          // Renamed files may have special code like R079 to indicate 79% of
          // the files are similar
          if (_.startsWith(symbol, 'R')) {
            return 'R';
          }

          return symbol;
        })
        .thru((symbol) => {
          // Unknown symbol, we return it as-is
          if (!_.has(symbolMapping, symbol)) {
            return symbol;
          }

          return symbolMapping[symbol];
        })
        .value();

      return { name, status };
    })
    .reject({ status: false })
    .sortBy('name')
    .value();
}

/**
 * Parses git --name-status output into a list of changed files
 * @param {string} input Raw --name-status output string
 * @returns {Array} List of objects with name, status, and optional from/similarity
 */
export function parseNameStatus(input) {
  return _.chain(input)
    .split('\n')
    .compact()
    .map((line) => {
      const split = line.split('\t');
      const symbol = split[0];

      // Renamed files have codes like R079 or R100
      if (_.startsWith(symbol, 'R')) {
        const similarity = parseInt(symbol.slice(1));
        return {
          name: split[2],
          status: 'renamed',
          from: split[1],
          similarity,
        };
      }

      const name = split[1];
      const status = _.has(symbolMapping, symbol)
        ? symbolMapping[symbol]
        : symbol;

      return { name, status };
    })
    .reject({ status: false })
    .sortBy('name')
    .value();
}
