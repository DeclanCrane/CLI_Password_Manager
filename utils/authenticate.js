import getConfig from "./getConfig.js";
import decrypt from "./decrypt.js";
import inquirer from "inquirer";
import chalk from "chalk";

import 'dotenv/config';

async function getPassword() {
    const pass = await inquirer.prompt({
        name: "pass",
        type: "password",
        message: "What is your password?\n"
    })

    return pass.pass;
}

export default async function authenticate() {
    const config = getConfig();

    const maxRetry = process.env.MAX_RETRY > 0 ? process.env.MAX_RETRY : 1;

    for(let i = 0; i < maxRetry; i++) {
        const password = await getPassword();
        const data = decrypt(config, password);

        if(data) {
            console.log(chalk.greenBright("Access granted"));
            return data;
        } else {
            console.log(chalk.redBright(`Access denied: attempt (${i + 1}/${maxRetry})`));
        }
    }
    process.exit(0);
}
