## TLDR

Clear git hook env vars in `run()` so Gilmore always operates on its own root, with tests in both `run.js` and `status.js`.

## What to build

In `lib/methods/run.js`, add `GIT_DIR: undefined`, `GIT_WORK_TREE: undefined`, `GIT_INDEX_FILE: undefined`, and `GIT_CEILING_DIRECTORIES: undefined` to the `env` object passed to `firostRun()`. Node's `child_process` omits keys with `undefined` values, so this strips the vars from the subprocess without touching `extendEnv` or any other env inheritance.

Add a new test file `lib/methods/__tests__/run.js` that sets `process.env.GIT_DIR` to a different repo, runs a Gilmore git command, and asserts it operates on the Gilmore root.

Add a test to `lib/methods/__tests__/status.js` that sets `process.env.GIT_DIR` to a dirty repo and asserts `repo.status()` returns the Gilmore root's (clean) state.

Both tests must save/restore `process.env.GIT_DIR` in beforeEach/afterEach.

## Behavioral Tests

**run.js — env isolation:**
- should not leak GIT_DIR from parent environment into subprocess
- should operate on Gilmore root when GIT_WORK_TREE points elsewhere

**status.js — end-to-end isolation:**
- should return clean status when GIT_DIR env points to a dirty repo

## Acceptance criteria

- [ ] `run()` sets `GIT_DIR`, `GIT_WORK_TREE`, `GIT_INDEX_FILE`, `GIT_CEILING_DIRECTORIES` to `undefined` in env
- [ ] New `lib/methods/__tests__/run.js` tests pass
- [ ] New test in `lib/methods/__tests__/status.js` passes
- [ ] Existing tests still pass
- [ ] No API changes — `run()` signature unchanged
