---
title: setRemote
---

<div class="lead">Create a new remote and make it the current one</div>

`await repo.setRemote(remoteName, remoteUrl)`

This will create a new remote with the specified URL, or update the URL if the
remote already exists, then make it the default remote for the current branch.

If no `remoteUrl` is given, it will attempt to switch to the specified
`remoteName` (but will fail is `remoteName` does not exist).

## See also

- [createRemote](/createRemote/): To create the remote without switching to it
- [switchRemote](/switchRemote/): To switch to an existing remote
