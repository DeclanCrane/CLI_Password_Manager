import inquirer from "inquirer";

export default async function textPrompt(msg) {
    const { answer } = await inquirer.prompt({
        name: "answer",
        message: msg,
        type: "input"
    });

    return answer;
}
