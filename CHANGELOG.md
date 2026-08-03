## v1.4.0

[compare changes](https://github.com/pixelastic/gilmore/compare/v1.3.0...v1.4.0)

### Features

- **run:** Support array input to safely handle filenames with spaces ([52bcbfe](https://github.com/pixelastic/gilmore/commit/52bcbfe))
- **add:** Pass file arguments as array to prevent word-splitting on spaces ([30dcf15](https://github.com/pixelastic/gilmore/commit/30dcf15))
- **readFile:** Use array form for git show to handle spaces in filepaths ([18b427d](https://github.com/pixelastic/gilmore/commit/18b427d))

## v1.3.0

[compare changes](https://github.com/pixelastic/gilmore/compare/v1.2.2...v1.3.0)

### Features

Added **stagedFilesWithStatus** that gives more details (added, deleted, renamed, etc) to each staged files

## v1.2.2

[compare changes](https://github.com/pixelastic/gilmore/compare/v1.2.1...v1.2.2)

### Bug Fixes

- **run:** Clear git hook env vars in subprocesses ([5501e36](https://github.com/pixelastic/gilmore/commit/5501e36))

## v1.2.1

[compare changes](https://github.com/pixelastic/gilmore/compare/v1.2.0...v1.2.1)

### Bug Fixes

- **github:** Validate github.com in remote URL before parsing ([755b0a4](https://github.com/pixelastic/gilmore/commit/755b0a4))
- **gilmore:** Default to process.cwd(), not wherever Gilmore is installed. ([5074af8](https://github.com/pixelastic/gilmore/commit/5074af8))

## v1.2.0


### Features

- **add:** Support string argument for single file (90574e8)
- **stagedFiles:** Add method to list staged files (99dec3c)