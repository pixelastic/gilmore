---
title: commit
---

<div class="lead">Commits staged files</div>

`await repo.commit(message)`

Any file staged through the [add](/add/) method will be commited.

## Errors

- If there are no files to be commited, a `GILMORE_COMMIT_NOTHING_TO_COMMIT`
  error will be thrown.
