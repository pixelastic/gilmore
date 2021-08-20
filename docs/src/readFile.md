---
title: readFile
---

<div class="lead">Returns the content of a file, at a specific commit.</div>

`await repo.readFile(filepath[, commit])`

This will return the content of the file as it was at the specified commit.

If no `commit` is passed, it will read the current content of the file.

If the file didn't exist at the specified `commit`, it will return `false`.
