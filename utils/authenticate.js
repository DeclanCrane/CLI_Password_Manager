import * as readline from "readline/promises"
import { stdin, stdout } from "node:process"
import bcrypt from "bcrypt"
import getConfig from "./getConfig.js"

export default async function authenticate() {
    // Get the master pass from database
    const config = getConfig();

    const rl = readline.createInterface({ input: stdin, output: stdout});

    let authenticated = false;
    const maxRetry = 3;
    let retryCount = 0;

    while(!authenticated) {
        let password = await rl.question("Please enter your master password: ");
        authenticated = bcrypt.compareSync(password, config.masterPass);
        if(authenticated)
            console.log("Access granted");
        else {
            retryCount = retryCount + 1;
            if(retryCount > maxRetry)
                process.exit()
            console.warn(`Access denied: attempt (${retryCount}/${maxRetry})`);
        }
    }
    rl.close();
    return authenticated;
}
