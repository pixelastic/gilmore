import path from 'path';
import * as url from 'url';
import config from 'aberlaas/configs/vite';

const rootPath = url.fileURLToPath(new URL('.', import.meta.url));
const globalSetupFile = path.resolve(rootPath, 'vite.globalSetup.js');

config.test.globalSetup = globalSetupFile;

export default config;
