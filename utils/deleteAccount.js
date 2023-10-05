import deleteService from "./deleteService.js";
import selectService from "./selection/selectService.js";
import selectAccount from "./selection/selectAccount.js";
import checkEmpty from "./checkEmpty.js";
import inquirer from "inquirer";

export default async function deleteAccount(db) {

    // Check if account database is empty
    if(checkEmpty(db))
        return;

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
