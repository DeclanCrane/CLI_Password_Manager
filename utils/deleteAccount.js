import textPrompt from "./prompts/textPrompt.js";
import confirmPrompt from "./confirmPrompt.js";
import listAccounts from "./listAccounts.js";
import deleteService from "./deleteService.js";

export default async function deleteAccount(db, service, index) {
    if (!index) {
        listAccounts(db, service);
        index = await textPrompt("Enter the number of the account you want to delete: ");
    }

    const confirm = confirmPrompt("Are you sure? [y/n]: ");
    if (confirm)
        db.accounts[`${service}`].splice(index, 1);
    else
        return;

    // Delete if the service contains no other accounts
    if (!db.accounts[`${service}`].length)
        deleteService(db, service)
}
