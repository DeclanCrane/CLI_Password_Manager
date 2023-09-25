import { homedir } from "node:os"
import { writeFileSync } from "node:fs"

export default function setConfig(config) {
    try {
        writeFileSync(`${homedir()}/${process.env.CONFIG_PATH}/${process.env.CONFIG_FILE}`, JSON.stringify(config, null, 2))
        return true;
    } catch (err) {
        console.error(`Error writing config: ${err}`)
        return false;
    }
}
