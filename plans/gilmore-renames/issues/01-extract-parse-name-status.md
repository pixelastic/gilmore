## TLDR

Extract rename-aware `parseNameStatus` to `lib/helper.js`, migrate callers, delete `parseStatus.js`.

## What to build

Create `lib/helper.js` exporting a `parseNameStatus` function that parses `--name-status` format git output. This replaces the old `parseStatus` which handled both `--name-status` and `--short` formats.

Rename-specific behavior:
- Status codes starting with `R` map to `'renamed'` (not `'modified'`)
- Similarity parsed from the code: `R079` → `79` via `parseInt(symbol.slice(1))`
- Two tab-separated paths: `split[1]` = source (`from`), `split[2]` = destination (`name`)
- Return `{ name, status: 'renamed', from, similarity }` for renames
- `from` and `similarity` omitted entirely from non-rename entries

All other status mappings unchanged from the old `parseStatus`.

Migrate `changedFiles.js` and `commitList.js` to import `parseNameStatus` from `lib/helper.js` directly (not via `this`).

Delete `lib/methods/parseStatus.js` and its test file.

## Behavioral Tests

**Parsing non-rename statuses**
- should parse added/modified/deleted statuses unchanged from --name-status input
- should filter out false-mapped statuses (AD)
- should sort results by name

**Parsing renames**
- should return status 'renamed' with from and similarity for R079 two-path input
- should return status 'renamed' with similarity 100 for R100
- should omit from and similarity from non-rename entries in mixed output

**Unknown symbols**
- should pass unknown symbols through as-is

## Scaffolding Tests

- `lib/methods/parseStatus.js` no longer exists
- `lib/helper.js` exists and exports `parseNameStatus`
- `changedFiles.js` imports from `../../helper.js`, not via `this.parseStatus`
- `commitList.js` imports from `../../helper.js`, not via `this.parseStatus`

## Acceptance criteria

- [ ] `lib/helper.js` exports `parseNameStatus`
- [ ] `R` status maps to `'renamed'` with `from` and `similarity` fields
- [ ] Non-rename entries have no `from` or `similarity`
- [ ] `changedFiles.js` uses imported `parseNameStatus` instead of `this.parseStatus`
- [ ] `commitList.js` uses imported `parseNameStatus` instead of `this.parseStatus`
- [ ] `lib/methods/parseStatus.js` deleted
- [ ] `lib/methods/__tests__/parseStatus.js` deleted
- [ ] All existing tests pass (behavioral equivalence for non-rename cases)
