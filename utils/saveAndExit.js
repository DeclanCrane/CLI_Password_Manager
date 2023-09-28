import inquirer from "inquirer";
import chalk from "chalk";
import setConfig from "./setConfig.js";

export default async function saveAndExit(db) {
    const answer = await inquirer.prompt({
        type: "confirm",
        name: "confirm",
        message: "Save changes?",
    });

    if(answer.confirm) {
        console.log(chalk.greenBright("Saving changes..."));
        setConfig(db, db.masterPass);
        process.exit(0);
    } else {
        console.log(chalk.redBright("Ignoring changes..."));
        process.exit(0);
    }
}
