---
title: commit
---

<div class="lead">Commits staged files</div>

`await repo.commit(message[, options])`

Any file staged through the [add][1] method will be committed.

## Options

The following options are accepted:

| Name        | Description                                                               | Default value |
| ----------- | ------------------------------------------------------------------------- | ------------- |
| `body`      | Additional commit body                                                    | (empty)       |
| `skipCi`    | If set to `true`, will skip the CI build (adding `[skip ci]` to the body) | `false`       |
| `skipHooks` | If set to `true`, will skip the git hooks (similar to `--no-verify`)      | `false`       |

## Name and email

By default, git will attempt to read the commit author name and email from the
following sources, in order of priority:

- The local `user.name` and `user.email` git config
- The `GIT_USER_NAME` and `GIT_USER_EMAIL` environment variables
- The global `user.name` and `user.email` git config

If no suitable name or email is available, Gilmore will throw
a `GILMORE_COMMIT_AUTHOR_IDENTITY_UNKNOWN`.

## Other errors

- If there are no files to be committed, a `GILMORE_COMMIT_NOTHING_TO_COMMIT`
  error will be thrown.

[1]: /add/
