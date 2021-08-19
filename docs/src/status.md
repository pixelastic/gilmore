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
    "path": "relative/path/to/file",
    "type": "one of a new/added/modified/deleted"
  },
  [...]
]
```
