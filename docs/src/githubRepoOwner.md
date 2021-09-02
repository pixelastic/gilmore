---
title: githubUser
---

<div class="lead">Returns the GitHub repo owner</div>

`await repo.githubRepoOwner()`

## Examples

```javascript
// With a remote configured to push to github.com/pixelastic/gilmore
const repoName = await repo.githubRepoOwner();
// => pixelastic
```

This will return the owner of the repo on GitHub.

## See also

- [githubRepoName](/githubRepoName/) to get the repo name (`gilmore`)
- [githubRepoSlug](/githubRepoSlug/) to get the repo slug (`pixelastic/gilmore`)

