## TLDR

`run()` accepts arrays — prepends `'git'`, passes to firost with `shell: false`.

## What to build

Modify `lib/methods/run.js` to branch on `Array.isArray(gitCommand)`:

- **Array input**: call `firostRun(['git', ...gitCommand], { shell: false, ...rest })` — each element stays as one OS arg
- **String input**: unchanged behavior — `firostRun(\`git ${gitCommand}\`, { shell: true, ...rest })`

The `shell: false` must be explicit for the array path, not relying on firost's default.

## Behavioral Tests

**describe('array input')**

- `should handle filenames with spaces when using array input` — init repo, create `file with spaces.txt`, stage it, call `repo.run(['diff', '--cached', '--', 'file with spaces.txt'])`, verify output contains expected diff

## Acceptance criteria

- [ ] `run()` accepts string input with unchanged behavior
- [ ] `run()` accepts array input, prepends `'git'`, uses `shell: false`
- [ ] New test passes: array input works with filenames containing spaces
- [ ] All existing tests pass
