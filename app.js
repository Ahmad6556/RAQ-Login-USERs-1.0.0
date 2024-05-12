//const
const express = require('express')
const app = express()
const port = 3000
const login = require('./schema/accounts')
const accountsCheck = require('./public/accounts-hide')
const RAQMibers = require('./schema/Schema')
const RAQOrders = require("./schema/orders")

const api = express();

//more const
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

//auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

//mongosDB
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Ahmad_RAQ:1w3r5y7i8@cluster0.wrxv6um.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(result => {
        app.listen(port, () => {
            console.log(`Example app listening on http://localhost:${port}/`)
        })
    })
    .catch(err => {
        console.log(err);
    });

//id device
// استيراد المكتبة
const { machineId, machineIdSync } = require('node-machine-id');

// الحصول على معرِّف الجهاز بشكل غير متزامن
machineId().then(id => {
    console.log(id)
});

// أو استخدام النسخة المتزامنة
const idDriver = machineIdSync();

//pages

//index

app.get("/", (req, res) => {
    res.redirect("/login")
})

////index

app.get('/:role/:idd/:id', (req, res) => {
    login.find()
        .then((result) => {
            RAQMibers.find()
                .sort({ "name": 1 })
                .then((resultRAQ) => {
                    res.render("index", {dis: "index" ,iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/:role/:idd/:id', (req, res) => {
    const accounts = new RAQMibers(req.body);
    accounts
        .save()
        .then(result => {
            res.redirect(`/${req.params.role}/${req.params.idd}/${req.params.id}`);
        })
        .catch(err => {
            console.log(err);
        });
})

//add

app.get('/:role/:idd/:id/add', (req, res) => {
    login.find()
        .then((result) => {
            RAQMibers.find()
                .sort({ "name": 1 })
                .then((resultRAQ) => {
                    res.render('add', {dis: "add" ,iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })

})

app.post('/:role/:idd/:id/add', (req, res) => {
    const article = new RAQMibers(req.body);

    console.log(req.body);

    article
        .save()
        .then(result => {
            res.redirect("/:role/:idd/:id/", { iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` });
        })
        .catch(err => {
            console.log(err);
        });
})

//data

app.get('/:role/:idd/:id/data/:ide', (req, res) => {
    login.find()
        .then((result) => {
            RAQMibers.find()
                .sort({ "name": 1 })
                .then((resultRAQ) => {
                    res.render("data", {dis: "data" , ide: req.params.ide, iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` });
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post("/:role/:idd/:id/data/:ide", (req, res) => {
    RAQMibers.deleteOne({ _id: req.params.ide }).then((result) => {
        console.log("deleted");
        res.redirect(`/${req.params.role}/${req.params.idd}/${req.params.id}`)
    });
})

//edit

app.get("/:role/:idd/:id/edit/:ide", (req, res) => {
    login.find()
        .then((result) => {
            RAQMibers.find()
                .sort({ "name": 1 })
                .then((resultRAQ) => {
                    res.render("edit", {dis: "edit" , ide: req.params.ide, item: result, iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` });
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
})


app.post("/:role/:idd/:id/edit/:ide", (req, res) => {
    const article = new RAQMibers(req.body);

    console.log(req.body);

    article
        .save()
        .then(result => {
            RAQMibers.deleteOne({ _id: req.params.ide }).then((result) => {
                res.redirect(`/${req.params.role}/${req.params.idd}/${req.params.id}/`);
            });
        })
        .catch(err => {
            console.log(err);
        });
});

//profits

app.get('/:role/:idd/:id/profits', (req, res) => {
    login.find()
        .then((result) => {
            RAQMibers.find()
                .sort({ "name": 1 })
                .then((resultRAQ) => {
                    res.render("profits", {dis: "profits", ide: req.params.ide, item: result, iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` });
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
})

//points
app.get('/:role/:idd/:id/points', (req, res) => {
    login.find()
        .then((result) => {
            RAQMibers.find()
                .sort({ "name": 1 })
                .then((resultRAQ) => {
                    res.render("points", { dis: "points" ,ide: req.params.ide, item: result, iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` });
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
})

//orders

app.get("/:role/:idd/:id/orders", (req, res) => {
    login.find()
        .then((result) => {
            RAQMibers.find()
                .sort({ "name": 1 })
                .then((resultRAQ) => {
                    RAQOrders.find()
                        .sort({ "name": 1 })
                        .then((resultRAqOrders) => {
                            res.render("orders", { dis: "orders" ,Orders: resultRAqOrders, ide: req.params.ide, item: result, iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` });
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err)
        })
})

app.post("/:role/:idd/:id/orders", (req, res) => {
    const article = new RAQOrders(req.body);

    console.log(req.body);

    article
        .save()
        .then(result => {
            res.redirect(`/${req.params.role}/${req.params.idd}/${req.params.id}/orders`);
        })
        .catch(err => {
            console.log(err);
        });
});

//orders

app.get("/:role/:idd/:id/AddOrder", (req, res) => {
    login.find()
        .then((result) => {
            RAQMibers.find()
                .sort({ "name": 1 })
                .then((resultRAQ) => {
                    RAQOrders.find()
                        .sort({ "name": 1 })
                        .then((resultRAqOrders) => {
                            res.render("AddOrders", {dis: "AddOrder" , Orders: resultRAqOrders, ide: req.params.ide, item: result, iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err)
        })
})

app.post("/:role/:idd/:id/AddOrder", (req, res) => {
    const article = new RAQOrders(req.body);

    article
        .save()
        .then(result => {
            res.redirect(`/${req.params.role}/${req.params.idd}/${req.params.id}/orders`);
        })
        .catch(err => {
            console.log(err);
        });
})

//orders

app.get("/:role/:idd/:id/manegOrders/:ide", (req, res) => {
    login.find()
        .then((result) => {
            RAQMibers.find()
                .sort({ "name": 1 })
                .then((resultRAQ) => {
                    RAQOrders.findById(req.params.ide)
                        .then((resultRAqOrders) => {
                            res.render("mangeOrders", {dis: "manegOrders" , Orders: resultRAqOrders, ide: req.params.ide, item: result, iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
        })
})


app.post("/:role/:idd/:id/manegOrders/:ide", (req, res) => {
    const article = new RAQOrders(req.body);

    console.log(req.body);

    article
        .save()
        .then(result => {
            RAQOrders.deleteOne({ _id: req.params.ide }).then((result) => {
                res.redirect(`/${req.params.role}/${req.params.idd}/${req.params.id}/orders`);
            })
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/:role/:idd/:id/orders/delete/:ide", (req, res) => {
    RAQOrders.deleteOne({ _id: req.params.ide }).then((result) => {
        res.redirect(`/${req.params.role}/${req.params.idd}/${req.params.id}/orders`)
    })
})

//mangeAccounts

app.get('/:role/:idd/:id/MangAccounts', (req, res) => {
    login.find()
        .sort({ "name": 1 })
        .then((result) => {
            RAQMibers.find()
                .sort({ "name": 1 })
                .then((resultRAQ) => {
                    res.render("MangeAccounts", { dis: "MangAccounts" ,iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
})

//DataAccounts

app.get("/:role/:idd/:id/mangAccounts/data/:ide", (req, res) => {
    login.find()
        .then((result) => {
            login.findById(req.params.ide)
                .then((resultD) => {
                    RAQMibers.find()
                        .sort({ "name": 1 })
                        .then((resultRAQ) => {
                            res.render("MangeDataAccounts", { dis: "deleteAccoutns" ,ide: resultD, iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
})

app.post("/:role/:idd/:id/mangAccounts/data/:ide", (req, res) => {
    login.deleteOne({ _id: req.params.ide }).then((result) => {
        res.redirect(`/${req.params.role}/${req.params.idd}/${req.params.id}/mangAccounts`)
    })
})

//EditAccounts

app.get("/:role/:idd/:id/mangAccounts/edit/:ide", (req, res) => {
    login.find()
        .then((result) => {
            login.findById(req.params.ide)
                .then((resultD) => {
                    RAQMibers.find()
                        .sort({ "name": 1 })
                        .then((resultRAQ) => {
                            res.render("MangeEditAccounts", { dis: "MangeEditAccounts" ,ide: resultD, iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
})

app.post("/:role/:idd/:id/mangAccounts/edit/:ide", (req, res) => {
    const accounts = new login(req.body);
    accounts
        .save()
        .then(result => {
            login.deleteOne({ _id: req.params.ide }).then((result) => {
                res.redirect(`/${req.params.role}/${req.params.idd}/${req.params.id}/mangAccounts`)
            })
        })
        .catch(err => {
            console.log(err);
        });
})

//mange User Account

app.get("/:role/:idd/:id/manegAccount/:ide", (req, res) => {
    login.find()
        .then((result) => {
            login.findById(req.params.ide)
                .then((resultD) => {
                    RAQMibers.find()
                        .sort({ "name": 1 })
                        .then((resultRAQ) => {
                            res.render("editYouAccount", { dis: "editYouAccount" ,ide: resultD, iddt: idDriver, Email: req.params.id, DB: result, arrArticle: resultRAQ, role: req.params.role, main: `/${req.params.role}/${req.params.idd}/${req.params.id}` })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
})

app.post("/:role/:idd/:id/manegAccount/:ide", (req, res) => {
    const accounts = new login(req.body);
    accounts
        .save()
        .then(result => {
            login.deleteOne({ _id: req.params.ide }).then((result) => {
                res.redirect(`/${req.params.role}/${req.params.idd}/${req.params.id}/`)
            })
        })
        .catch(err => {
            console.log(err);
        });
})







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//login
app.get('/Login', (req, res) => {
    login.find()
        .then((result) => {
            res.render('Login', { idD: idDriver })

            result.forEach(item => {
                accountsCheck.addHere(item.name, item.UserName, item.email, item.pass, item.role, item._id, item.id_device)
                /*
                console.log(item.name)
                console.log(item.UserName)
                console.log(item.role)
                console.log(item.email)
                console.log(item.pass)
                console.log(item._id)
                console.log(item.id_device)
                */
            });
        })
        .catch((err) => {
            console.log(err);
        });
})

app.post('/login', (req, res) => {
    email = req.body.email
    pass = req.body.pass
    id = accountsCheck.accountid
    AE = accountsCheck.accountsEmail
    AP = accountsCheck.accountPass
    AR = accountsCheck.AccountRole
    AN = accountsCheck.accountsName
    AU = accountsCheck.accountUserName
    AIDD = accountsCheck.Accountid_device

    for (let i = 0; i < 1000000; i++) {
        if (AE[i] == email) {
            if (AP[i] == pass) {

                if (idDriver == AIDD[i]) {
                    res.redirect(`/${AR[i]}/${AIDD[i]}/${email}`);
                    accountsCheck.deleteArr()
                } else if (idDriver != AIDD[i]) {
                    // تعريف الدالة غير المتزامنة
                    async function updateLogin() {
                        try {
                            login.find()
                                .then((result) => {
                                    result.forEach(item => {
                                        if (item.email == AE[i]) {
                                            // حذف الوثيقة القديمة
                                            login.deleteOne({ _id: item._id }).then((result) => {
                                                const data = {
                                                    _id: item._id,
                                                    name: AN[i],
                                                    nameYouMember: item.nameYouMember,
                                                    UserName: AU[i],
                                                    email: email,
                                                    pass: pass,
                                                    role: AR[i],
                                                    id_device: idDriver
                                                }
                                                const accounts = new login(data);
                                                accounts
                                                    .save()
                                                    .then(result => {
                                                        res.redirect(`/${AR[i]}/${idDriver}/${email}/`);
                                                        accountsCheck.deleteArr()
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    });
                                            });
                                        }
                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        } catch (err) {
                            console.log(err);
                            // handle error
                        }
                    }

                    // استدعاء الدالة غير المتزامنة
                    updateLogin();
                    // إنشاء حساب
                }
            }
            else if (i == 1000000) {
                res.redirect('/Login')
            }
        } else if (i == 1000000) {
            res.redirect('/Login')
        }
    }
})

//create account
app.get('/signUp', (req, res) => {
    res.render('signUp', { idd: idDriver })
})

app.post("/signUp", (req, res) => {
    a = true
    for (let i = 0; i < 1000000; i++) {
        if (req.body.email == accountsCheck.accountsEmail[i] || req.body.name == accountsCheck.accountsName[i] || req.body.UserName == accountsCheck.accountUserName) {
            a = false
        }
    }
    if (a == true) {
        const accounts = new login(req.body);
        accounts
            .save()
            .then(result => {
                res.redirect("/Login");
            })
            .catch(err => {
                console.log(err);
            });
    } else if (a == false) {
        res.redirect("/signUp")
    }
});

app.post("/:role/:idd/:id/Logout", (req, res) => {
})

app.use((req, res) => {
    res.status(404).redirect('/');
});