---
title: getRemote
---

<div class="lead">Returns metadata about a remote</div>

`await repo.getRemote(remoteName)`

## Examples

```javascript
const { name, user, isCurrent } = await repo.getRemote('origin');
```

Returns `false` if `remoteName` does not exist. If no `remoteName` is set, it
will fallback to the current remote.
