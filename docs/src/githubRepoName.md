---
title: githubRepoName
---

<div class="lead">Returns the GitHub repo name</div>

`await repo.githubRepoName()`

## Examples

```javascript
// With a remote configured to push to github.com/pixelastic/gilmore
const repoName = await repo.githubRepoName();
// => gilmore
```

This will return the name of the repo on GitHub.

## See also

- [githubRepoOwner](/githubRepoOwner/) to get the repo owner (`pixelastic`)
- [githubRepoSlug](/githubRepoSlug/) to get the repo slug (`pixelastic/gilmore`)


