## Guidance

- Monorepo: runtime code lives in `lib/`, dependencies are in `lib/node_modules/`
- Test command: `yarn test` from repo root, or `yarn test -- --testPathPattern=run` for a specific file
- Test files live next to source at `lib/methods/__tests__/<method>.js`
- Tests use `tmpDirectory('gilmore/<method>')`, `Gilmore` instance with `{ globalConfig: false }`, and `afterEach` cleanup
- firost 5.11.0 array support: `_.isArray(command) ? command : parseCommandString(command)` in `lib/node_modules/firost/run.js`
- `shell: true` + array is NOT compatible — Node joins args with spaces, re-introducing word-splitting

## Discoveries
