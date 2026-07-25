## Guidance

- Test command: `yarn test` from repo root
- Single test file: `yarn vitest run lib/methods/__tests__/parseStatus.js`
- Gilmore uses `golgoth` for lodash (`{ _ }`) and `firost` for filesystem utilities
- Tests use real temporary git repos via `firost`'s `tmpDirectory`, not mocks
- The `__` pattern for private methods: export a `const __ = {}` object with methods, enabling test spying. See `aberlaas/modules/helper/lib/helper.js` for prior art.
- `lib/helper.js` is a flat file (not a directory with barrel), internal only (not exposed on Gilmore instance)
- `parseNameStatus` handles `--name-status` format only. `--short` parsing is inlined in `status.js`.
- Rename entries: `{ name, status: 'renamed', from, similarity }`. Optional fields (`from`, `similarity`) omitted entirely from non-rename entries, not set to `undefined`.

## Discoveries
