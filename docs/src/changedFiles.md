---
title: changedFiles
---

<div class="lead">Returns a list of changed files between two commits.</div>

`await repo.changedFiles(fromCommit[, toCommit])`

If `toCommit` is empty, the current `HEAD` will be used.

## Example

```json
[
  {
    "name": "relative/path/to/file",
    "status": "one of a new/added/modified/deleted"
  },
  [...]
]
```
