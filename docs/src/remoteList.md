---
title: remoteList
---

<div class="lead">Returns the list of all local remotes</div>

`await repo.remoteList()`

## Example

```json
[
  {
    "name": "fork",
    "url": "git@github.com:fork/gilmore.git",
    "isCurrent": false,
  },
  {
    "name": "origin",
    "url": "git@github.com:pixelastic/gilmore.git",
    "isCurrent": true,
  },
  [...]
]
```
