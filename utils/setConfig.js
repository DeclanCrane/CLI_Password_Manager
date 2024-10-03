import getConfigDir from './getConfigDir.js';
import { writeFileSync } from "node:fs"
import encrypt from "./encrypt.js";
export default function setConfig(config, key) {
    try {
        // Encrypt the output
        const cypher = encrypt(config, key);
        writeFileSync(getConfigDir(), cypher)
        return true;
    } catch (err) {
        console.error(`Error writing config: ${err}`)
        return false;
    }
}
