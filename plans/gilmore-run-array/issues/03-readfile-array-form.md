## TLDR

`readFile()` uses array form for the `show` command, preventing word-splitting on spaces.

## What to build

Modify `lib/methods/readFile.js`:

- Change `this.run(\`show ${commit}:${filepath}\`)` to `this.run(['show', \`${commit}:${filepath}\`])`

`commit:filepath` is a single git token, so it stays as one array element.

## Acceptance criteria

- [ ] `readFile()` with commit uses array form
- [ ] `readFile()` without commit still reads from disk (unchanged)
- [ ] All existing `readFile.js` tests pass
