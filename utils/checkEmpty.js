import chalk from "chalk";

// Checks if JSON database services and accounts are empty.
// Returns 'true' if empty
export default function checkEmpty(db, service) {
    if(JSON.stringify(db.accounts) === "{}") {
        console.log(chalk.yellowBright("No accounts stored."));
        return true;
    }
    if(service)
        if(JSON.stringify(db.accounts[`${service}`]) === "{}") {
            console.log(chalk.yellowBright(`No accounts stored in service: ${service}`));
        }

    return false;
}
