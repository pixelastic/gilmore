---
title: commit
---

<div class="lead">Commits staged files</div>

`await repo.commit(message)`

Any file staged through the [add](/add/) method will be commited.

## Errors

- If there are no files to be commited, a `GILMORE_COMMIT_NOTHING_TO_COMMIT`
  error will be thrown.
- If no git `user.name` and `user.email` are defined, it will attempt to
  fallback to the values of the `GIT_USER_NAME` and `GIT_USER_EMAIL` environment
  variables. If those are missing, it will throw
  a `GILMORE_COMMIT_AUTHOR_IDENTITY_UNKNOWN` error.
