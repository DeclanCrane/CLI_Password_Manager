import deleteService from "./deleteService.js";
import inquirer from "inquirer";

async function selectService(db) {
    // Get the list of services
    const services = [];
    for (var key in db.accounts) {
        services.push(key)
    }

    console.log(services);

    const answer = await inquirer.prompt({
        name: "service",
        type: "list",
        choices: services
    });

    return answer.service;
}

async function selectAccount(db, service) {
    const accounts = [];
    db.accounts[`${service}`].map(account => {
        accounts.push(account.username);
    })

    console.log(accounts);

    const answer = await inquirer.prompt({
        name: "account",
        type: "list",
        message: "Select an account to delete",
        choices: accounts    
    });

    return accounts.indexOf(answer.service);
}

export default async function deleteAccount(db) {
    // Select service
    const service = await selectService(db);

    const accountIndex = await selectAccount(db, service);

    const answer = await inquirer.prompt({
        name :"confirm",
        type: "confirm",
        message: "Are you sure?", 
    });

    if (answer.confirm)
        db.accounts[`${service}`].splice(accountIndex, 1);
    else
        return;

    // Delete if the service contains no other accounts
    if (!db.accounts[`${service}`].length)
        deleteService(db, service)
}
