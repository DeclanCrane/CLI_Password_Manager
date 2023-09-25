import { homedir } from "node:os"

// Returns the directory of the database file
/*
    TODO: Currently just returns .env paths. 
    Allow users to specifcy their own path.
*/

export default function getConfigDir() {
    return `${homedir()}/${process.env.CONFIG_PATH}/${process.env.CONFIG_FILE}`
}
