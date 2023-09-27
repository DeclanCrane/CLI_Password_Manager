import textPrompt from "./prompts/textPrompt.js";

export default async function addAccount(db, service, username, password) {
    
    // Check if options are passed in
    if(!service) 
        service = await textPrompt("Enter a service name (i.e. Steam): "); 

    if(!username) 
        username = await textPrompt("Enter the account username or email: ");

    if(!password)
        password = await textPrompt("Enter the account password: ");


    const account = { 
        service: service,
        username: username,
        password: password
    }

    service = service.toLowerCase();
    if(!db.accounts[`${service}`]) {
        db.accounts[`${service}`] = new Array();
    }
    db.accounts[`${service}`].push(account); 
}
