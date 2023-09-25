import * as readline from "node:readline/promises"
import { stdin, stdout } from "node:process"
import createDatabase from "./createDatabase";
import getConfig from "./getConfig";
import setConfig from "./setConfig";
async function setup() {
    // Create inital database file
    createDatabase() 

    // Setup user's master password
    const rl = readline.createInterface({ input: stdin, output: stdout});

    let password = "";
    while(password.length <= 0) {
        password = await rl.question("Please create a master password: ");
    }

    // Get config
    const config = getConfig()
    // Write config
    config.masterPass = password
    if(setConfig(config))
        console.log("Database updating successfully");
    else
        console.error("Database update failed");
}
