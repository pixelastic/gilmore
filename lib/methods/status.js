const { _ } = require('golgoth');
/**
 * Returns a list of all changed/deleted/added files, much like git status
 **/
module.exports = async function () {
  try {
    const output = await this.run('status --short');
    if (!output) {
      return [];
    }

    const symbolMapping = {
      'A ': 'added',
      AM: 'added',
      ' M': 'updated',
      '??': 'new',
    };

    return _.chain(output)
      .split('\n')
      .map((line) => {
        const symbol = line.slice(0, 2);
        const path = line.slice(3);
        const status = symbolMapping[symbol] || symbol;
        return { status, path };
      })
      .value();
  } catch (_err) {
    return false;
  }
};
