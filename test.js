import fs from 'node:fs';
import getConfigDir from './utils/getConfigDir.js';

const data = fs.readFileSync(getConfigDir(), { encoding: 'utf8'});

console.log(data);