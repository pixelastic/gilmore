---
title: readFileJson
---

<div class="lead">Reads a `.json` file at the specified commit and returns its
parsed content.</div>

`await repo.readFileJson(filepath[, commit])`

This will return the parsed JSON content of the file as it was at the specified
commit.

If no `commit` is passed, it will read the current content of the file.

If the file didn't exist at the specified `commit`, it will return `false`.
