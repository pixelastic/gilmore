---
title: Gilmore
---

<div class="lead">Gilmore is a toolbox for git and GitHub.</div>

## Installation

```
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

