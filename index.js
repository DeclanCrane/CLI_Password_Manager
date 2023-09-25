import {existsSync} from "node:fs"
import getConfigDir from "./utils/getConfigDir.js"
import getConfig from "./utils/getConfig.js"
import setup from "./utils/setup.js"
import authenticate from "./utils/authenticate.js"
import CryptoJS from "crypto-js"
import "dotenv/config"

// Check if a database file exists ( setup complete )
if (!existsSync(getConfigDir())) {
    await setup()
}

console.log("Welcome");

// Get config
const config = getConfig();

// Authenticate
const authInfo = await authenticate(config.masterPass);
if(!authInfo.success){
    process.exit();
}

// Decrypt database accounts
if(config.accounts.length) {
    const data = CryptoJS.AES.decrypt(config.accounts, authInfo.key);
    const accounts = JSON.parse(data.toString(CryptoJS.enc.Utf8));
    config.accounts = accounts;
}






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
