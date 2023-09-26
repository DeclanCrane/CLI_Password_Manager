import * as readline from "readline/promises"
import { stdin, stdout } from "node:process"
import getConfig from "./getConfig.js";
import decrypt from "./decrypt.js";

export default async function authenticate() {
    const rl = readline.createInterface({ input: stdin, output: stdout});

    let password = "";
    let authenticated = false;
    const maxRetry = 3;
    let retryCount = 0;
    const config = getConfig();

    while(!authenticated) {
        password = await rl.question("Please enter your master password: ");
        const data = decrypt(config, password)
        if(data) {
            rl.close();
            console.log("Access granted");
            return data;
        } else {
            retryCount = retryCount + 1;
            if(retryCount > maxRetry)
                process.exit()
            console.warn(`Access denied: attempt (${retryCount}/${maxRetry})`);
        }
    }
}
