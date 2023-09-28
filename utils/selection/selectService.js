import inquirer from "inquirer";

export default async function selectService(db) {
    // Get the list of services
    const services = [];
    for (var key in db.accounts) {
        services.push(key)
    }

    console.log(services);

    const answer = await inquirer.prompt({
        name: "service",
        type: "list",
        choices: services
    });

    return answer.service;
}
