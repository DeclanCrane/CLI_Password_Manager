import { mkdirSync } from "node:fs"
import { platform, homedir } from "node:os"

// Creates the database files for storing accounts
export default function createDatabaseDir() {
    const dir = `${homedir()}/${process.env.CONFIG_PATH}`
    // Create database folder
    try {
        mkdirSync(dir, { recursive: true })
        return dir;
    } catch(err) {
        console.error(`Error creating database directory ${err}`);
        return false;
    }
}
