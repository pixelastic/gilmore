## Problem Statement

Gilmore loses rename semantics. `parseStatus` maps git's `R` status to `'modified'`, so consumers can't distinguish renames from edits. `stagedFiles()` runs `git diff --cached --name-only` without `-M`, causing renames to appear as a deletion + addition (two entries) instead of a single rename.

## Solution

Make Gilmore rename-aware across its git status parsing and staging APIs:
- Renames return `status: 'renamed'` with `from` (source path) and `similarity` (percentage)
- `stagedFiles()` collapses renames into a single destination entry
- New `stagedFilesWithStatus()` method gives staged files with full status detail including rename info

## User Stories

1. As a consumer of `status()`, I want renames to have `status: 'renamed'` with a `from` field, so that I can distinguish renames from modifications
2. As a consumer of `changedFiles()`, I want renames to include `from` and `similarity`, so that I can trace file lineage across commits
3. As a consumer of `commitList()`, I want `changedFiles` entries to reflect renames accurately, so that commit history shows real file movements
4. As a consumer of `stagedFiles()`, I want a renamed file to appear as a single destination path, so that I don't process a ghost deletion + addition
5. As a consumer, I want a `stagedFilesWithStatus()` method, so that I can inspect the status (including renames) of staged files without running raw git commands
6. As a consumer of `stagedFilesWithStatus()`, I want rename entries to include `from` and `similarity`, so that I get the same rename detail as `changedFiles()`

## Implementation Decisions

### Splitting `parseStatus` by format

`parseStatus` currently handles both `--name-status` and `--short` git output formats. These formats diverge for renames:
- `--name-status`: `R100\told.txt\tnew.txt` (tab-separated paths, similarity in status code)
- `--short`: `R  old.txt -> new.txt` (arrow-separated paths, no similarity)

Rather than branching inside one parser, split into two format-specific parsers:
- `parseNameStatus` in `lib/helper.js` — shared internal helper for `--name-status` format (used by `changedFiles`, `commitList`, `stagedFilesWithStatus`)
- `__.parseShortStatus` inlined in `status.js` — `--short` format (single caller)

The old `parseStatus.js` is deleted.

### `parseNameStatus` return shape

- Non-renames: `{ name, status }` (unchanged)
- Renames: `{ name, status: 'renamed', from, similarity }` where `name` is destination, `from` is source, `similarity` is an integer 0-100 parsed from the `R` code (e.g. `R079` -> `79`)
- `from` and `similarity` are omitted (not `undefined`) from non-rename entries

### `__.parseShortStatus` return shape

- Same as `parseNameStatus` for non-renames: `{ name, status }`
- Renames: `{ name, status: 'renamed', from }` — `similarity` omitted (not available in `--short` format)

### `stagedFiles` flag

Add `-M` to `git diff --cached --name-only` so git detects renames and returns a single destination path instead of source-deleted + destination-added.

### `stagedFilesWithStatus` method

- Runs `git diff --cached -M --name-status`
- Pipes output through `parseNameStatus`
- No try/catch (follows `stagedFiles` pattern, not `status` pattern)
- Wired into `main.js` next to `stagedFiles` in the Actions section

### `parseStatus` removed from public API

No external consumer uses `repo.parseStatus()`. The replacement `parseNameStatus` lives in `lib/helper.js` as an internal helper, not exposed on the Gilmore instance.

### Symbol mapping

`R` moves from the "modified" group to a new `'renamed'` value. All other mappings unchanged.

## Testing Decisions

Good tests exercise external behavior through realistic git scenarios, not implementation internals. Gilmore tests use real temporary git repos (via `firost`'s `tmpDirectory`) — no mocking of git.

### Modules tested

1. **`parseNameStatus`** (unit) — test the `--name-status` parser directly with crafted input strings. Cover: added/modified/deleted unchanged, rename with two paths and similarity, unknown symbols. Prior art: existing `parseStatus` test.

2. **`status`** (integration) — test `--short` rename handling via real git operations: create file, commit, `git mv`, stage, call `status()`, assert rename entry with `from`. Prior art: existing `stagedFiles` tests use real repos.

3. **`stagedFiles`** (integration) — test that a staged rename returns only the destination path (single entry, not two). Prior art: existing `stagedFiles` test file.

4. **`stagedFilesWithStatus`** (integration) — test staged renames return `{ name, status: 'renamed', from, similarity }`. Prior art: existing `stagedFiles` test file.

## Out of Scope

- Copy detection (`C` status with similarity) — not changing `C: 'added'` mapping
- Rename detection in `git status --short` for unstaged renames (git doesn't report these)
- Exposing `parseNameStatus` publicly
- Error handling changes to `status()` (keeping existing try/catch + `false` pattern)
