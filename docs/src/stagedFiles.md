---
title: stagedFiles
---

<div class="lead">Returns a list of files currently in the staging area.</div>

`await repo.stagedFiles()`

This is equivalent to calling `git diff --cached --name-only`.

## Example

```js
await repo.add('file.js');
const staged = await repo.stagedFiles();
// ['file.js']
```

Returns an array of file paths for all files currently staged, or an empty array
if nothing is staged. Returns `false` if an error occurs (e.g., not in a git
repository).

Note: If a file has both staged and unstaged changes, it will still be included
in the results.
