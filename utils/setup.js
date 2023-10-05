import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import { rmSync } from "node:fs"
import createDatabaseDir from "./createDatabaseDir.js";
import dbBoiler from "../templates/dbBoiler.js";
import setConfig from "./setConfig.js";

export default async function setup() {
    // Create database directory 
    const dir = createDatabaseDir() 

    console.log(chalk.blue(figlet.textSync("SETUP")));

    // Master password tips for security
    console.log(chalk.blueBright("Please enter a master password.\n"+
        "This password is used to decrypt this file.\n"+
        "You should use a strong password."));

    let passwordSuccess = false;
    let password = "";
    while(!passwordSuccess) {
        // Get the first attempt
        const answer = await inquirer.prompt({
            name: "password",
            type: "input",
            message: "Enter a master password: "
        });
        // Get the second attempt, and compare 
        const answer2 = await inquirer.prompt({
            name: "password",
            type: "input",
            message: "Enter your master password again: "
        });

        if(answer.password.length <= 0) {
            console.log(chalk.redBright("The master password cannot be empty.\nTry Again."));
            continue;
        }

        if(answer.password === answer2.password) {
            password = answer.password;
            passwordSuccess = true;
        }
        else
            console.log(chalk.redBright("Passwords not matching.\nTry Again."));
    }

    // Set password
    const db = dbBoiler;
    db.masterPass = password;

    // Create database file
    if(setConfig(db, password)) {
        console.log(chalk.greenBright("Created config successfully."));
        console.log(chalk.blueBright("Please login"));
    }
    else {
        console.error(chalk.redBright("Error creating config."))
        rmSync(`${dir}/${process.env.CONFIG_FILE}`);
    }
}
