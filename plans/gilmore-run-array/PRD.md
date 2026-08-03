## Problem Statement

gilmore's `run()` method only accepts a string, which it interpolates into `git ${gitCommand}` and passes to `firost.run()` with `shell: true`. This causes word-splitting when filenames contain spaces (e.g. `Super Mario Bros 3/`), because the shell splits the interpolated string on whitespace before git sees it.

## Solution

Accept arrays in `run()`. When given an array, prepend `'git'` and pass to `firost.run()` with `shell: false` — each element stays as a single OS-level argument, no word-splitting. Then convert filepath-consuming methods (`add`, `readFile`) to use array form.

## User Stories

1. As a developer, I want to `repo.add(['file with spaces.txt'])` so that filenames with spaces are staged correctly without manual quoting.
2. As a developer, I want to `repo.readFile('file with spaces.txt', 'HEAD')` so that I can read file contents at a commit even when the path has spaces.
3. As a developer, I want `repo.run(['diff', '--cached', '--', 'my file.txt'])` so that I can run arbitrary git commands on paths with spaces.
4. As a developer, I want `repo.run('log --oneline')` to keep working exactly as before so that existing string-based callers are unaffected.
5. As a developer, I want `repo.add()` with no arguments to keep adding all files so that the default behavior is unchanged.

## Implementation Decisions

- `run()` branches on `Array.isArray(gitCommand)`:
  - Array: prepend `'git'`, pass to `firost.run()` with explicit `shell: false`
  - String: unchanged behavior (`shell: true`)
- `add()` with no files stays as string `run('add -A')` — `-A` is a flag, not a filepath
- `add()` with files uses `run(['add', ..._.castArray(userFiles)])`
- `readFile()` uses `run(['show', \`${commit}:${filepath}\`])` — `commit:path` is one git token, one array element
- Only filepath-consuming methods are converted. Methods that only interpolate branch names, tags, config keys, remote names, or commit refs stay as strings.
- firost 5.11.0 (already installed in lib/) supports array input natively

## Testing Decisions

- Good tests here exercise external behavior: does the right git operation happen on files with spaces?
- `run.js` gets one new test in a sibling `describe('array input')`: create a file with spaces, stage it, assert `run(['diff', '--cached', '--', 'file with spaces.txt'])` returns expected diff
- `add.js` and `readFile.js` need no new tests — existing tests cover their behavior; the change is internal plumbing
- Prior art: existing `run.js` tests use `tmpDirectory`, `Gilmore` instance with `globalConfig: false`, and `afterEach` cleanup

## Out of Scope

- Converting non-filepath methods (branch, tag, config, remote, log, etc.) to arrays
- Adding shell-metacharacter validation to array elements
- Upgrading firost (already at 5.11.0)

## Further Notes

`shell: true` + array is explicitly NOT compatible — Node.js joins array args with spaces before passing to the shell, re-introducing word-splitting. This is why the array path must use `shell: false`.
