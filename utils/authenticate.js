import getConfig from "./getConfig.js";
import decrypt from "./decrypt.js";
import inquirer from "inquirer";
import chalk from "chalk";

async function getPassword() {
    const pass = await inquirer.prompt({
        name: "pass",
        type: "password",
        message: "What is your password?\n"
    })

    return pass.pass;
}

export default async function authenticate() {
    const maxRetry = 3;
    const config = getConfig();

    for(let i = 1; i <= maxRetry; i++) {
        const password = await getPassword(); 
        const data = decrypt(config, password)
        if(data) {
            console.log(chalk.greenBright("Access granted"));
            return data;
        } else {
            console.log(chalk.redBright(`Access denied: attempt (${i}/${maxRetry})`));
        }
    }
    process.exit(1);
}
