import os from "node:os"
import path from 'node:path';

import 'dotenv/config';

// Returns the directory of the database file
/*
    TODO: Currently just returns .env paths. 
    Allow users to specifcy their own path.
*/

export default function getConfigDir() {
    return path.join(os.homedir(), process.env.CONFIG_PATH, process.env.CONFIG_FILE)
}
