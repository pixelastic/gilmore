---
title: commitList
---

<div class="lead">Returns the history of past commits</div>

`await repo.commitList()`

Returns a list of all past commits in the current branch (similar to `git log`).
The list is ordered with the most recent commit first.

## Example

```json
[
  {
    "hash": "1ce8ffe",
    "message": "commit message"
  },
  [...]
]
```

