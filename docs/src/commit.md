---
title: commit
---

<div class="lead">Commits staged files</div>

`await repo.commit(message)`

Any file staged through the [add](/add/) method will be commited.

## Name and email

By default, git will attempt to read the commit author name and email from the
following sources, in order of priority:

- The `GIT_AUTHOR_NAME` and `GIT_AUTHOR_EMAIL`
- The local `user.name` and `user.email` git config
- The global `user.name` and `user.email` git config

If no suitable name or email is available, Gilmore will throw
a `GILMORE_COMMIT_AUTHOR_IDENTITY_UNKNOWN`.

## Other errors

- If there are no files to be commited, a `GILMORE_COMMIT_NOTHING_TO_COMMIT`
  error will be thrown.
