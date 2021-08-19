---
title: newFile
---

<div class="lead">Creates the smallest possible syntactically valid file of the
specified extension at the specified location.</div>

`await repo.newFile(filepath)`

This is a wrapper around [firost newFile method][1], but scoped to the current
repository.

You would probably never have to use this method; I use it only in the tests.

[1]: https://projects.pixelastic.com/firost/newFile/
