## Issue 01 — run() array support
### Return-early pattern not applied
```javascript
const isArrayInput = _.isArray(gitCommand);
const command = isArrayInput ? ['git', ...gitCommand] : `git ${gitCommand}`;
```
**Problem:** Code uses ternary instead of return-early guard clause.
**Reason skipped:** Both branches feed into a single `firostRun` call. Splitting would duplicate the call site — ternary is the pragmatic choice.

### Test command shape differs from spec
```javascript
await repo.run(['diff', '--cached', '--name-only', '--', 'file with spaces.txt']);
```
**Problem:** Spec says `['diff', '--cached', '--', 'file with spaces.txt']` without `--name-only`.
**Reason skipped:** `--name-only` makes the assertion deterministic; the intent (prove spaces work) is fully met.

### _.isArray instead of Array.isArray
```javascript
const isArrayInput = _.isArray(gitCommand);
```
**Problem:** Spec says to branch on `Array.isArray(gitCommand)`.
**Reason skipped:** Project conventions prefer lodash utilities; behaviorally equivalent.
