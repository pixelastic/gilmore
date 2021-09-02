---
title: githubRepoSlug
---

<div class="lead">Returns the GitHub repo slug</div>

`await repo.githubRepoSlug()`

## Examples

```javascript
// With a remote configured to push to github.com/pixelastic/gilmore
const repoName = await repo.githubRepoSlug();
// => pixelastic/gilmore
```

This will return the full slug name of the repository on GitHub.

## See also

- [githubRepoOwner][1] to get the repository owner (`pixelastic`)
- [githubRepoName][2] to get the repository name (`gilmore`)

[1]: /githubRepoOwner/
[2]: /githubRepoName/
