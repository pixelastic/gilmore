## Guidance

- **Test runner:** `yarn vitest` (vite config at `vite.config.js`)
- **Run specific tests:** `yarn vitest lib/methods/__tests__/run.js`
- **Fix location:** `lib/methods/run.js` — the `env` object in the `firostRun()` call
- **Test prior art:** `lib/methods/__tests__/status.js` — uses `tmpDirectory()`, `repo.init()`, `remove()` pattern
- **Subprocess chain:** Gilmore `run()` → `firost.run()` → execa (vendored at `lib/node_modules/execa/`) → `child_process.spawn`
- **Env mechanism:** execa defaults to `extendEnv: true`, which spreads `process.env` then applies options `env` on top. `undefined` values are omitted by Node's `child_process`.

## Discoveries
