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
    "subject": "commit message",
    "body": "extended commit body",
    "changedFiles": [
      {
        "name": "relative/path/to/file",
        "status": "one of a new/added/modified/deleted",
      },
      [...]
    ],
    "author": {
      "name": "Gilmore",
      "email": "gilmore@gloriousgood.com",
    },
  },
  [...]
]
```

