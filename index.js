import * as fs from "node:fs";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import bcrypt from "bcrypt";
import dbBoiler from "./templates/dbBoiler.js";
import addAccount from "./utils/addAccount.js";
import deleteAccount from "./utils/deleteAccount.js";
import confirmPrompt from "./utils/confirmPrompt.js";
import "dotenv/config"

let dbPath = '/home/shady/.config/pwd-mgr/'

// Check if a master password is already in the db file (setup complete)
if (fs.existsSync(`${dbPath}`)) {
    console.log("File exists");
} else {
    // Make directory for the program's files to be saved
    try {
        fs.mkdirSync(dbPath, { recursive: true });
        console.log("Created database path: ", dbPath)
    } catch (err) {
        console.error("Error creating directory: ", err);
    }
}

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

// Get user's master pass



confirmPrompt()
