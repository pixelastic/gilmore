## Issue 01 — Extract parseNameStatus
### Two public exports in helper.js
```javascript
export function parseStatus(input) {
export function parseNameStatus(input) {
```
**Problem:** js-writer mandates one public named function per file
**Reason skipped:** `helper.js` is a flat internal helper (per GUIDANCE.md), and `parseStatus` is a temporary bridge until issue 02 removes it

### parseStatus has no test coverage
```javascript
export function parseStatus(input) {
```
**Problem:** Deleted `__tests__/parseStatus.js` but `parseStatus` still exists and is untested
**Reason skipped:** `parseStatus` is a verbatim copy of the original; issue 02 will remove it entirely

### parseStatus still exposed as public API
```javascript
import { parseStatus } from './helper.js';
// ...
parseStatus,
```
**Problem:** Spec says to delete parseStatus, but it's still on the Gilmore instance
**Reason skipped:** `status.js` still calls `this.parseStatus()`; issue 02 handles that migration

### R: 'modified' retained in symbolMapping
```javascript
R: 'modified', // renamed
```
**Problem:** Stale mapping contradicts the spec's rename intent
**Reason skipped:** Only used by the temporary `parseStatus` bridge; `parseNameStatus` handles R before the lookup

## Issue 02 — Status short parser
### R symbol not in symbolMapping fallthrough
```javascript
if (symbol === 'R' && split[2] === '->') {
```
**Problem:** If a rename line fails the `->` check, `R` is not in `symbolMapping` and falls through to produce `{ status: 'R' }`.
**Reason skipped:** Out of scope. `R` with similarity suffix (e.g. `R100`) only occurs in `--name-status` format, not `--short`. The spec explicitly defines detection via `->` in `split[2]`.

## Issue 03 — Staged files rename support
### No early-return guard
```javascript
export async function stagedFilesWithStatus() {
  const output = await this.run('diff --cached -M --name-status');
  return parseNameStatus(output);
}
```
**Problem:** No guard for empty/falsy output before calling parseNameStatus
**Reason skipped:** parseNameStatus handles empty input gracefully — lodash chain splits empty string, compact removes it, returns []

### Repeated test setup
```javascript
await repo.newFile('old.js');
await repo.add('old.js');
await repo.commit('add old.js');
await repo.run('config diff.renames false');
await repo.run('mv old.js new.js');
```
**Problem:** Three tests repeat similar rename setup, could use it.each or helper
**Reason skipped:** Tests have different setups (empty vs rename vs mixed) and different assertions; it.each doesn't fit

### Scaffolding tests missing from diff
**Problem:** Spec agent flagged scaffolding tests as absent from diff
**Reason skipped:** Tests exist at plans/gilmore-renames/scaffold/03-staged-files-rename-support.bats, just outside the lib/ diff scope
