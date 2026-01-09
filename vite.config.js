import path from 'node:path';
import * as url from 'node:url';
import config from 'aberlaas/configs/vite';

const rootPath = url.fileURLToPath(new URL('.', import.meta.url));
const globalSetupFile = path.resolve(rootPath, 'vite.globalSetup.js');

config.test.globalSetup = globalSetupFile;
config.test.testTimeout = 10000;

export default config;
