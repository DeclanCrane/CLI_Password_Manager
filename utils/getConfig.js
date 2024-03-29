import { readFileSync } from "node:fs"
import { homedir } from "node:os"

export default function getConfig() {
    let data = "";
    try {
        data = readFileSync(`${homedir()}/${process.env.CONFIG_PATH}/${process.env.CONFIG_FILE}`,
            { encoding: 'utf8' });
    } catch (err) {
        console.error(`Error reading database file: ${err}`)
    }
    return data;
}
