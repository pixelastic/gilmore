// Git needs to know who the authors and committers are, before being able to
// generate a commit. It usually gets its value from ~/.gitconfig, but as we
// want our tests to be reproducible, we'll override it with env variables, that
// take precedence
process.env.GIT_AUTHOR_NAME = 'Gilmore';
process.env.GIT_AUTHOR_EMAIL = 'gilmore@gloriousgoods.com';
process.env.GIT_AUTHOR_DATE = 'Thu, 30 Aug 2018 16:43:00 +0200';

process.env.GIT_COMMITTER_NAME = process.env.GIT_AUTHOR_NAME;
process.env.GIT_COMMITTER_EMAIL = process.env.GIT_AUTHOR_EMAIL;
process.env.GIT_COMMITTER_DATE = process.env.GIT_AUTHOR_DATE;
