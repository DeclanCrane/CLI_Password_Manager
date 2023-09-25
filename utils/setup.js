import * as readline from "node:readline/promises"
import { stdin, stdout } from "node:process"
import { rmSync } from "node:fs"
import createDatabase from "./createDatabase.js";
import getConfig from "./getConfig.js";
import setConfig from "./setConfig.js";
import getConfigDir from "./getConfigDir.js";
import bcrypt from "bcrypt";
export default async function setup() {
    // Create inital database file
    createDatabase() 

    // Setup user's master password
    const rl = readline.createInterface({ input: stdin, output: stdout});

    let password = "";
    while(password.length <= 0) {
        password = await rl.question("Please create a master password: ");
    }
    rl.close();
    
    // Encrypt master password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Write inital config with master password 
    const config = getConfig()
    config.masterPass = hash;
    
    if(setConfig(config, password))
        console.log("Setup complete");
    else {
        console.error("Setup failed: could not write database file");
        // Delete the database file for future reattempt
        rmSync(getConfigDir());
    }
}
