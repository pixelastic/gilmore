/**
 * Init a new repository
 * @param {object} userOptions Additional options
 * @param {boolean} userOptions.bare Set to true to init a bare repo (default is
 * false)
 **/
module.exports = async function (userOptions) {
  const options = {
    bare: false,
    ...userOptions,
  };

  const command = ['init'];

  if (options.bare) {
    command.push('--bare');
  }
  await this.run(command.join(' '));
};
