---
title: createRemote
---

<div class="lead">Create a new remote</div>

`await repo.createRemote(remoteName, remoteUrl)`

This will create a new remote with the specified URL, or update the URL if the
remote already exists.

It **will not** make it the default remote for the current branch, you'll need
to manually call [switchRemote](/switchRemote/) (or use
[setRemote](/setRemote/))
