## TLDR

`add()` uses array form for filepath args, preventing word-splitting on spaces.

## What to build

Modify `lib/methods/add.js`:

- Empty `userFiles` → keep string `this.run('add -A')`
- With files → `this.run(['add', ..._.castArray(userFiles)])`

Remove the `.chain().castArray().join(' ').value()` string-building logic.

## Acceptance criteria

- [ ] `add()` with no args still adds all files (string path)
- [ ] `add()` with files uses array form
- [ ] All existing `add.js` tests pass
