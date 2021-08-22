---
title: Gilmore
---

<div class="lead">Gilmore is a toolbox for git and GitHub.</div>

## Installation

```sh
yarn add gilmore
```

## Usage

You need to create an instance of Gilmore for a given repository. Then you can
call all of Gilmore methods on this instance:

```javascript
const Gilmore = require('gilmore');
const repo = new Gilmore('/path/to/repo');

(async () => {
  const head = await repo.currentCommit();
  console.info(`The HEAD hash is ${head}`);
})();
```

## Options

In addition to the repository root as first argument, you can also pass an option
object as the second argument.

The accepted options are as follow:

| Name                  | Description                                                                                                                           | Default value |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `globalConfig` | By default, git reads the `~/.gitconfig` file for additional configuration. Set this to `false` to only use the local repository config | `true`        |
