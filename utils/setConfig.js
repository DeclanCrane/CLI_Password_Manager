import { homedir } from "node:os"
import { writeFileSync } from "node:fs"
import CryptoJS from "crypto-js";

export default function setConfig(config, masterPass) {
    // Encrypt accounts, if any exist
    if (config.accounts.length) {
        const accounts = config.accounts;
        const cypher = CryptoJS.AES.encrypt(JSON.stringify(accounts), masterPass).toString();

        config.accounts = cypher;
    }

    try {
        writeFileSync(`${homedir()}/${process.env.CONFIG_PATH}/${process.env.CONFIG_FILE}`, JSON.stringify(config, null, 2))
        return true;
    } catch (err) {
        console.error(`Error writing config: ${err}`)
        return false;
    }
}
