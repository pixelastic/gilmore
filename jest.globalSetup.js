/**
 * When running the tests as a pre-commit hook, git sets the GIT_AUTHOR_NAME and
 * GIT_AUTHOR_EMAIL environment variables. Those take precendence over any
 * user.name and user.email git config set.
 *
 * This breaks our tests, because with those vars always defined, we cannot
 * properly test the various use-cases. It is even more confusing because the
 * tests pass when run directly, but fail when run through husky.
 *
 * So, we force disable them
 **/
module.exports = async () => {
  delete process.env.GIT_AUTHOR_NAME;
  delete process.env.GIT_AUTHOR_EMAIL;
};
