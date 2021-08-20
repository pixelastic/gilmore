---
title: status
---

<div class="lead">Returns a list of changed files since last commit.</div>

`await repo.status()`

This is equivalent to calling `git status`.

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
