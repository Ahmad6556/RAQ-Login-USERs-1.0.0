let accountsName = []
let accountUserName = []
let accountsEmail = []
let accountPass = []
let AccountRole = []
let accountid = []
let Accountid_device = []

function addHere(name, UserName, Email, pass, Role, id, id_device) {
    accountsName.push(name)
    accountUserName.push(UserName)
    accountsEmail.push(Email)
    accountPass.push(pass)
    accountid.push(id)
    AccountRole.push(Role)
    Accountid_device.push(id_device)
}

function deleteArr() {
    accountsName.length = 0;
    accountUserName.length = 0;
    accountsEmail.length = 0;
    accountPass.length = 0;
    AccountRole.length = 0;
    accountid.length = 0;
    Accountid_device.length = 0;
}

module.exports = {
    addHere,
    deleteArr,
    accountsName,
    accountUserName,
    accountsEmail,
    accountPass,
    AccountRole,
    Accountid_device
}