import { readFileSync } from "node:fs"
import getConfigDir from "./getConfigDir.js";

export default function getConfig() {
    try {
        return readFileSync(getConfigDir(), { encoding: 'utf8'});
    } catch (err) {
        console.error(`Error reading database file: ${err}`);
        process.exit(1);
    }
}
