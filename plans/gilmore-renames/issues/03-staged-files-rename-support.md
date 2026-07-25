## TLDR

Add `-M` to `stagedFiles`, create `stagedFilesWithStatus`, wire up in `main.js`, remove `parseStatus` from public API.

## What to build

**`stagedFiles.js`** — add `-M` flag to `git diff --cached --name-only` so renames collapse to a single destination entry.

**`stagedFilesWithStatus.js`** — new method:
- Runs `git diff --cached -M --name-status`
- Imports `parseNameStatus` from `lib/helper.js` and pipes output through it
- Returns array of `{ name, status, from?, similarity? }`
- No try/catch (follows `stagedFiles` pattern)

**`main.js`** — wire `stagedFilesWithStatus` in the Actions section next to `stagedFiles`. Remove `parseStatus` import and its entry from the returned object (both in the Internals section).

## Behavioral Tests

**stagedFiles with -M**
- should return single destination path for a staged rename (not two entries)

**stagedFilesWithStatus**
- should return empty array when nothing staged
- should return renamed entry with name, status, from, and similarity for a staged rename
- should return mixed statuses (added + renamed) for multiple staged files

## Scaffolding Tests

- `parseStatus` not present on Gilmore instance
- `stagedFilesWithStatus` present on Gilmore instance

## Acceptance criteria

- [ ] `stagedFiles` runs `git diff --cached -M --name-only`
- [ ] `stagedFilesWithStatus.js` exists and imports `parseNameStatus` from helper
- [ ] `stagedFilesWithStatus` returns correct shape for renames
- [ ] `stagedFilesWithStatus` wired in `main.js` Actions section
- [ ] `parseStatus` removed from `main.js` imports and returned object
- [ ] All existing `stagedFiles` tests still pass
