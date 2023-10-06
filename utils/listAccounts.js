import checkEmpty from "./checkEmpty.js";
import figlet from "figlet"
import chalk from "chalk"

export default function listAccounts(db, serviceName) {
    if (checkEmpty(db) || checkEmpty(db, serviceName))
        return;

    // Clear console
    console.clear()

    // Make sure there are accounts.
    if (JSON.stringify(db.accounts) === "{}")
        console.log(chalk.yellowBright("No accounts created"));

    if (!serviceName) {
        for (var service in db.accounts) {
            console.log(chalk.blueBright(figlet.textSync((`${service}`))))
            db.accounts[`${service}`].map((account, idx) => {
                console.log(`${idx + 1}) User: ${chalk.greenBright(account.username)}, Pass: ${chalk.redBright(account.password)}`)
            })
        }
    } else {
        db.accounts[serviceName].map((account, idx) => {
            console.log(`${idx + 1}) User: ${account.username}, Pass: ${account.password}`)
        })
    }
}
