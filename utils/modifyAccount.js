import selectAccount from "./selection/selectAccount.js";
import selectService from "./selection/selectService.js";
import listAccounts from "./listAccounts.js";
import inquirer from "inquirer";
import chalk from "chalk";

async function textInput(msg) {
    const answer = await inquirer.prompt({
        name: "input",
        type: "input",
        message: msg, 
    })

    return answer.input;
}

export default async function modifyAccount(db) {
    const service = await selectService(db);
    const accountIndex = await selectAccount(db, service);

    // Get account object from index
    const account =  db.accounts[`${service}`].at(accountIndex);

    // Ask the user which field they'd like to edit
    const answer = await inquirer.prompt({
        name: "field",
        type: "list",
        message: "Which field would you like to edit?",
        choices: ["Username", "Password"]
    });

    switch (answer.field) {
        case "Username":
            console.log(`${chalk.blueBright("Original Username:")} ${account.username}`)
            // Print the original account info
            const newUser = await textInput("Enter a new username: ");
            account.username = newUser;
            break;
        case "Password":
            console.log(`${chalk.blueBright("Original Password:")} ${account.password}`)
            const newPass = await textInput("Enter a new password: ");
            account.password = newPass;
            break;
    }
    console.log(chalk.blueBright("Changes: "));
    listAccounts(db, service);
}
