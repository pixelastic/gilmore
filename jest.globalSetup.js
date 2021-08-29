module.exports = async () => {
  delete process.env.GIT_AUTHOR_NAME;
  delete process.env.GIT_AUTHOR_EMAIL;

  process.env.GIT_USER_NAME = 'Gilmore';
  process.env.GIT_USER_EMAIL = 'gilmore@gloriousgoods.com';
};
