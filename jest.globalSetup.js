/**
 * When running the tests as a pre-commit hook, git sets the GIT_AUTHOR_NAME and
 * GIT_AUTHOR_EMAIL environment variables. Those take precendence over any
 * user.name and user.email git config set.
 *
 * This breaks our tests, because with those values are dependent on the values
 * of the global ~/.gitconfig. It is even more confusing because the tests pass
 * when run directly, but fail when run through husky.
 **/
module.exports = async () => {
  process.env.GIT_AUTHOR_NAME = 'Gilmore';
  process.env.GIT_AUTHOR_EMAIL = 'gilmore@gloriousgoods.com';
};
