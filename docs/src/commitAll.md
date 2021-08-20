---
title: commitAll
---

<div class="lead">Commit all changed files</div>

`await repo.commitAll(message)`

This is equivalent to calling `git add . && git commit`, but as it is a pretty
common occurrence, I made it into its own method.
