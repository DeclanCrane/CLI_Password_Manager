import { mkdirSync } from "node:fs"
import getConfigDir from './getConfigDir.js';
import path from 'node:path'

// Creates the database files for storing accounts
export default function createDatabase() {
    // Create database folder
    try {
        mkdirSync(path.dirname(getConfigDir()), { recursive: true })
        return true;
    } catch(err) {
        console.error(`Error creating database directory ${err}`);
        return false;
    }
}
