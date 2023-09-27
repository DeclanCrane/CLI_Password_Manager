export default function listAccounts(db, serviceName) {
    if(!serviceName) {
        for(var service in db.accounts) {
            console.log(service)
            db.accounts[`${service}`].map((account, idx) => {
                console.log(`${idx}. ${account.username}, ${account.password}`)
            })
        }
    } else {
        db.accounts[serviceName].map((account, idx) => {
            console.log(`${idx}. ${account.username}, ${account.password}`)
        })
    }
}
