import inquirer from "inquirer";

export default async function selectAccount(db, service) {
    const accounts = [];
    db.accounts[`${service}`].map(account => {
        accounts.push(account.username);
    })

    console.log(accounts);

    const answer = await inquirer.prompt({
        name: "account",
        type: "list",
        message: "Select an account",
        choices: accounts    
    });

    return accounts.indexOf(answer.service);
}
