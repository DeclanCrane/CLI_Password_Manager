import * as readline from "node:readline/promises"
import { stdin, stdout } from "node:process"
import { rmSync } from "node:fs"
import createDatabaseDir from "./createDatabaseDir.js";
import dbBoiler from "../templates/dbBoiler.js";
import setConfig from "./setConfig.js";

export default async function setup() {
    // Create database directory 
    const dir = createDatabaseDir() 

    // Setup user's master password
    const rl = readline.createInterface({ input: stdin, output: stdout});

    let password = "";
    while(password.length <= 0) {
        password = await rl.question("Please create a master password: ");
    }
    rl.close();

    // Set password
    const db = dbBoiler;
    db.masterPass = password;

    // Create database file
    if(setConfig(db, password))
        console.log("Created config successfully")
    else {
        console.error("Error creating config")
        rmSync(`${dir}/${process.env.CONFIG_FILE}`);
    }
}
