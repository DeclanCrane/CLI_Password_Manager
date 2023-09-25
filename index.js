import {existsSync} from "node:fs"
import setup from "./utils/setup.js"
import "dotenv/config"

// Check if a master password is already in the db file (setup complete)
if (!existsSync(``)) {
    await setup()
}

console.log("Hello, World");

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
