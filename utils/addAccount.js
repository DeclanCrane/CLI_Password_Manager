export default function addAccount(db, { service, username, password }) {
    const account = { 
        username: username,
        password: password
    }

    db.accounts[`${service}`] = account;
}
