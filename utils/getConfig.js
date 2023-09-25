import { readFileSync } from "node:fs"
import { homedir } from "node:fs"

export default function getConfig() {
    const data = "";
    try {
        data = readFileSync(`${homedir()}/${process.env.CONFIG_PATH}/${process.env.CONFIG_FILE}`,
            { encoding: 'utf8' });
    } catch (err) {
        console.error(`Error reading database file: ${err}`)
        return false;
    }

    // Parse plain text into JSON
    try {
        const config = JSON.parse(data)
        return config
    } catch (err) {
        console.error(`Error parsing config ${err}`)
        return false;
    }
}
