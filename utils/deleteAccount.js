export default function deleteAccount(db, service) {
    delete db.accounts[`${service}`];
}
