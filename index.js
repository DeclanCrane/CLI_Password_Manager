import {existsSync} from "node:fs"
import setConfig from "./utils/setConfig.js"
import getConfigDir from "./utils/getConfigDir.js"
import setup from "./utils/setup.js"
import authenticate from "./utils/authenticate.js"
import addAccount from "./utils/addAccount.js"
import deleteAccount from "./utils/deleteAccount.js"
import listAccounts from "./utils/listAccounts.js"
import "dotenv/config"

// Check if a database file exists ( setup complete )
if (!existsSync(getConfigDir())) {
    await setup()
}

console.log("Welcome");

// Get config
//const config = getConfig();

// Authenticate

const config = await authenticate();
listAccounts(config);

console.log(config);

//await deleteAccount(config, "steam");

//console.log(JSON.stringify(config));

setConfig(config, config.masterPass);

// Decrypt database accounts
/*

*/






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
