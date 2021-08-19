---
title: run
---

<div class="lead">Execute an arbitrary git command in the current repository</div>

`await repo.run(gitCommand)`

This will execute a git command and return the output. This is a plumbing method
used internally by all the other methods, but also publicly accessible for raw
usage.

## Example

```javascript
const repo = new Gilmore();
const rawStatus = await repo.run('status');
```

