import { stdin, stdout } from "node:process"
import * as readline from "node:readline/promises"

export default async function confirmPrompt() {
    const rl = readline.createInterface({ input: stdin, output: stdout});

    let answer = "";
    while (answer.toLowerCase() != "y" && answer.toLowerCase() != "n") {
        answer = await rl.question("Are you sure? [y/n]: ");
    }

    rl.close();

    if(answer == "y")
        return true;
    if(answer == "n")
        return false;
}
