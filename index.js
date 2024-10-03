#!/bin/node

import { existsSync } from "node:fs"
import getConfigDir from "./utils/getConfigDir.js"
import setup from "./utils/setup.js"
import authenticate from "./utils/authenticate.js"
import addAccount from "./utils/addAccount.js"
import deleteAccount from "./utils/deleteAccount.js"
import modifyAccount from "./utils/modifyAccount.js"
import listAccounts from "./utils/listAccounts.js"
import saveAndExit from "./utils/saveAndExit.js"
import figlet from "figlet"
import inquirer from "inquirer"
import gradient from "gradient-string"
import "dotenv/config"

// Welcome
const welcomeGradient = gradient(['#1eff00', '#1d7512', '#1eff00']);
console.log(welcomeGradient(figlet.textSync("WELCOME")));

// Check if a database file exists ( setup complete )
if (!existsSync(getConfigDir())) {
    await setup()
}

// Authenticate
const config = await authenticate();

// Menu
while (true) {
    const menu = await inquirer.prompt({
        name: "menu",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "List Accounts",
            "Add Account",
            "Delete Account",
            "Modify Account",
            "Exit",
        ]
    });

    switch (menu.menu) {
        case "List Accounts":
            listAccounts(config);
            break;
        case "Add Account":
            await addAccount(config);
            break;
        case "Delete Account":
            await deleteAccount(config)
            break;
        case "Modify Account":
            await modifyAccount(config)
            break;
        case "Exit":
            await saveAndExit(config);
    }
}
