import { mkdirSync } from "node:fs"
import { platform, homedir } from "node:os"
import setConfig from "./setConfig.js"
import dbBoiler from "../templates/dbBoiler.js"

// Creates the database files for storing accounts
export default function createDatabase() {
    // Create database folder
    try {
        mkdirSync(`${homedir()}/${process.env.CONFIG_PATH}`, { recursive: true })
    } catch(err) {
        console.error(`Error creating database directory ${err}`);
        return false;
    }

    // Create database file
    if(setConfig(dbBoiler))
        console.log("Created config successfully")
    else
        console.error("Error creating config")
}
