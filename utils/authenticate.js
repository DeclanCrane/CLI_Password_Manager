import * as readline from "readline/promises"
import { stdin, stdout } from "node:process"
import bcrypt from "bcrypt"

export default async function authenticate(masterPassHash) {
    const rl = readline.createInterface({ input: stdin, output: stdout});

    let password = "";
    let authenticated = false;
    const maxRetry = 3;
    let retryCount = 0;
    const authInfo = { key: "", success: false }

    while(!authenticated) {
        password = await rl.question("Please enter your master password: ");
        authenticated = bcrypt.compareSync(password, masterPassHash);
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
    authInfo.key = password;
    authInfo.success = authenticated;
    return authInfo;
}
