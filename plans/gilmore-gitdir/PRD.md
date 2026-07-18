## Problem Statement

When Gilmore is used inside a git hook (pre-commit, pre-push, etc.), git sets environment variables like `GIT_DIR` and `GIT_WORK_TREE`. The `run()` method spawns git subprocesses via `firost.run()` -> execa with `extendEnv: true` (the default), so these variables leak into every git command Gilmore runs. This causes Gilmore to operate on the hook's parent repo instead of the repo it was instantiated with via `new Gilmore(path)`.

The bug is invisible in normal usage and only surfaces when Gilmore runs inside a git hook — tests pass manually but fail during pre-commit.

## Solution

Clear git-specific environment variables in the `run()` method's subprocess `env` option by setting them to `undefined`. Node's `child_process` omits `undefined` env values, effectively removing them from the subprocess without affecting the rest of the inherited environment.

This ensures Gilmore always operates on `this.root` regardless of the calling environment.

## User Stories

1. As a developer using Gilmore inside a pre-commit hook, I want `repo.status()` to reflect the status of the repo I instantiated, so that my hook logic operates on the correct repository.
2. As a developer using Gilmore inside a pre-push hook, I want git commands to target the Gilmore instance's root, so that push validation works correctly.
3. As a developer creating a temporary Gilmore repo in a test suite that runs during a git hook, I want the temp repo to be fully isolated from the parent hook environment, so that my tests don't produce false positives or negatives.
4. As a developer using Gilmore in any context, I want the fix to be transparent — no API changes, no new options, so that existing code continues to work without modification.
5. As a developer calling any Gilmore method (commit, add, branchList, etc.) inside a hook, I want all methods to be isolated from hook env vars, so that I don't need to handle this on a per-method basis.

## Implementation Decisions

- **Mechanism:** Set `GIT_DIR`, `GIT_WORK_TREE`, `GIT_INDEX_FILE`, and `GIT_CEILING_DIRECTORIES` to `undefined` in the `env` option passed to `firostRun()`. Verified that Node's `child_process` omits keys with `undefined` values.
- **No `extendEnv` change:** Keep execa's default `extendEnv: true`. The `undefined` approach surgically removes only the problematic vars while preserving all other inherited env vars (PATH, SSH_AUTH_SOCK, LANG, etc.).
- **Single fix point:** The fix goes in the `run()` method only. All other Gilmore methods delegate to `run()`, so they are covered transitively.
- **No new API surface:** No new options, no breaking changes. The fix is internal to `run()`.

## Testing Decisions

Good tests for this fix should verify observable behavior (does Gilmore operate on the correct repo?) rather than implementation details (does the env object contain undefined?).

**Modules with tests:**

- **`run.js`** — New test file `lib/methods/__tests__/run.js`. Set `process.env.GIT_DIR` to point at a different repo, call a Gilmore method, verify it operates on the Gilmore root. Save/restore `process.env` in beforeEach/afterEach.
- **`status.js`** — Add a test to existing `lib/methods/__tests__/status.js` that sets `GIT_DIR` in the environment and asserts `repo.status()` returns the correct (Gilmore root) state, not the parent repo's state.

**Prior art:** Existing tests in `lib/methods/__tests__/status.js` use `tmpDirectory()` for isolated temp repos, `repo.init()` to set up, and `remove()` to tear down. New tests follow the same pattern.

## Out of Scope

- Clearing other git env vars beyond the 4 listed (e.g. `GIT_OBJECT_DIRECTORY`, `GIT_ALTERNATE_OBJECT_DIRECTORIES`) — these are only relevant in server-side hooks (pre-receive) which is not a Gilmore use case.
- Changing `extendEnv` to `false` — too invasive, risks breaking subprocess behavior that depends on inherited env vars.
- Adding a user-facing option to control env isolation — unnecessary complexity for a bug fix.

## Further Notes

The `undefined` suppression technique was verified empirically: Node >= 16 omits keys with `undefined` values when passing `env` to `child_process.spawn`. This is the same Node version range required by Gilmore's ES module usage.
