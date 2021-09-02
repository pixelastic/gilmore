---
title: switchRemote
---

<div class="lead">Switches to an existing remote</div>

`await repo.switchRemote(remoteName)`

This will set the current remote to `remoteName`.

If `remoteName` does not exist, it will throw
a `GILMORE_REMOTE_SWITCH_UNKNOWN_REMOTE_NAME` error.

## See also

- [createRemote](/createRemote/): To create the remote without switching to it
- [setRemote](/setRemote/): To create a remote and switch to it directly
