import { stdin, stdout } from "node:process";
import * as readline from "readline/promises";

export default async function textPrompt(msg) {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    let input = "";

    while(!input) {
        input = await rl.question(msg);
    }
    rl.close()
    return input;
}
