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
