import { appendFileSync } from "node:fs"
import { platform } from "node:os"
import dbBoiler from "../templates/dbBoiler.js"

// Creates the database files for storing accounts
export default function createDatabase() {
    // Create database folder
    try {
        fs.mkdirSync(`${os.homedir()}/${process.env.CONFIG_PATH}`, { recursive: true })
    } catch(err) {
        console.error(`Error creating database directory ${err}`);
        return false;
    }
    // Create database file
    try {
    appendFileSync(`${os.homedir()}/${process.env.CONFIG_PATH}/${process.env.CONFIG_FILE}`,
        JSON.stringify(dbBoiler));
    } catch(err) {
        console.error(`Error creating database file: ${err}`)
        return false;
    }
    return true;
}
