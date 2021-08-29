module.exports = async () => {
  // Used by Gilmore to set the default commit user
  process.env.GIT_USER_NAME = 'Gilmore';
  process.env.GIT_USER_EMAIL = 'gilmore@gloriousgoods.com';

  // Added by pre-commit hooks started by Husky. They may interfere with our
  // tests, so we delete them.
  delete process.env.GIT_AUTHOR_NAME;
  delete process.env.GIT_AUTHOR_EMAIL;
};
