import figlet from "figlet"
import chalk from "chalk"

export default function listAccounts(db, serviceName) {

    if (!serviceName) {
        for (var service in db.accounts) {
            db.accounts[`${service}`].map((account, idx) => {
                console.log(chalk.blueBright(figlet.textSync((`${service}`))))
                console.log(`${idx + 1}) User: ${chalk.greenBright(account.username)}, Pass: ${chalk.redBright(account.password)}`)
            })
        }
    } else {
        db.accounts[serviceName].map((account, idx) => {
            console.log(`${idx + 1}) User: ${account.username}, Pass: ${account.password}`)
        })
    }
}
