---
title: init
---

<div class="lead">Initialize a git repository</div>

`await repo.init([options])`

This will call `git init` and set the default branch name to `main`.

## Options

The method accepts the following options:

| Name   | Description                               | Default value |
| ------ | ----------------------------------------- | ------------- |
| `bare` | Set to `true` to create a bare repository | `false`       |
