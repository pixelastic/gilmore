---
title: removeFile
---

<div class="lead">Removes a file from the repo</div>

`await repo.removeFile(filepath)`

This is a wrapper around [firost remove method][1], but scoped to the current
repository.

Note that it won't commit the change, nor even add it to the staging area. It
will simply delete the file from disk.

[1]: https://projects.pixelastic.com/firost/remove/
