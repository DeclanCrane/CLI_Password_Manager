export default function deleteService(db, service) {
    delete db.accounts[`${service}`];
}
