import { existsSync } from "node:fs"
import setConfig from "./utils/setConfig.js"
import getConfigDir from "./utils/getConfigDir.js"
import setup from "./utils/setup.js"
import authenticate from "./utils/authenticate.js"
import addAccount from "./utils/addAccount.js"
import deleteAccount from "./utils/deleteAccount.js"
import listAccounts from "./utils/listAccounts.js"
import chalk from "chalk"
import figlet from "figlet"
import "dotenv/config"
import inquirer from "inquirer"

console.log(chalk.greenBright(figlet.textSync("WELCOME")));

// Check if a database file exists ( setup complete )
if (!existsSync(getConfigDir())) {
    await setup()
}

// Authenticate
const config = await authenticate();
listAccounts(config);

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
            await deleteAccount()
            break;
        case "Exit":
            process.exit(0);
    }
}



// Save and exit
const answer = await inquirer.prompt({
    name: "changes",
    type: "confirm",
    message: "Save changes?",
    default: "Y",
});

if (answer.changes) {
    console.log(chalk.greenBright("Saving changes..."));
    setConfig(config, config.masterPass);
}
else
    console.log(chalk.redBright("Ignoring changes..."));
process.exit(0);

/*
if (fs.existsSync(`${dbPath}db.txt`))
    console.log("Database already exists");
else {
    // === SETUP ===
    // Create a master password ( used for decrypting database )
    const rl = readline.createInterface({ input, output });
    const masterPass = await rl.question("Enter your master password: ");
    console.log("Your master password:", masterPass);
    rl.close();
    // Encrypt master password and store it in database file
    bcrypt.hash(masterPass, 10, (err, hash) => {
        if (err)
            console.error("Error hashing...", err);

        console.log(`Hashed pass: ${hash}`);

        // Create the database
        const buff = dbBoiler;
        buff.masterPass = hash;
        fs.appendFileSync(`${dbPath}db.txt`, JSON.stringify(buff));
    });
}
*/

// Get user's master pass



//confirmPrompt()
