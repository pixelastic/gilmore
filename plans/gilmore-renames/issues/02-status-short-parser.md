## TLDR

Inline a `--short` format parser in `status.js` with rename support.

## What to build

`status.js` currently delegates to `this.parseStatus()`. Replace that with a local `__.parseShortStatus()` function that handles `git status --short` format specifically.

The `__` object is exported for test spying (same pattern as `aberlaas/helper.js`).

Rename handling for `--short` format:
- `R  old.txt -> new.txt` → `{ name: 'new.txt', status: 'renamed', from: 'old.txt' }`
- Detect via `->` in `split[2]`: `from = split[1]`, `name = split[3]`
- `similarity` omitted (not available in `--short` format)

All other `--short` statuses (`??`, `AM`, `AD`, `A`, `M`, `D`, etc.) behave identically to current behavior.

## Behavioral Tests

**Rename detection**
- should return status 'renamed' with from for a staged rename
- should omit similarity for --short renames

**Existing behavior preserved**
- should return 'added' for untracked files (??)
- should return 'added' for staged-and-modified files (AM)
- should filter out staged-and-deleted files (AD)
- should return 'modified' for modified files
- should return 'deleted' for deleted files

## Acceptance criteria

- [ ] `status.js` no longer calls `this.parseStatus()`
- [ ] `status.js` exports `__` with `parseShortStatus` method
- [ ] Staged renames return `{ name, status: 'renamed', from }` without `similarity`
- [ ] All existing `--short` statuses handled identically to before
