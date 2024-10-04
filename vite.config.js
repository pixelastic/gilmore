import path from 'path';
import * as url from 'url';
import config from 'aberlaas/configs/vite';

const rootPath = url.fileURLToPath(new URL('.', import.meta.url));
const gilmoreSetupFile = path.resolve(rootPath, 'vite.setupFile.js');

config.test.setupFiles = [
  ...new Set([...config.test.setupFiles, gilmoreSetupFile]),
];

export default config;
