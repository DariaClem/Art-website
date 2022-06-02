const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const session = require('express-session');

app = express();
app.set("view engine", "ejs");

app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false
}));

app.use("/resources", express.static(__dirname + "/resources"));
app.use(express.urlencoded({extended: true}));

app.get(["/", "/index"], function (req, res) {
    res.render("pagini/index", {utilizator: req.session.utilizator});
});

caleJson = __dirname + '/resources/json/user.json';
app.post("/inregistrare", function (req, res) {
    let obUseri;
    if (fs.existsSync(caleJson)) {
        let textFisier = fs.readFileSync(caleJson).toString("utf8");
        obUseri = JSON.parse(textFisier);
    } else {
        obUseri = {useri: []};
    }
    req.body.parola = crypto.scryptSync(req.body.parola, "parola criptare", 32).toString("hex");
    obUseri.useri.push(req.body);
    fs.writeFileSync(caleJson, JSON.stringify(obUseri));

    res.render("pagini/inregistrare", {raspuns: "ok", utilizator: req.session.utilizator});
})

app.post("/login", function (req, res) {
    let obUseri;
    if (fs.existsSync(caleJson)) {
        let textFisier = fs.readFileSync(caleJson).toString("utf8");
        obUseri = JSON.parse(textFisier);
    } else {
        obUseri = {useri: []};
    }
    req.body.parola = crypto.scryptSync(req.body.parola, "parola criptare", 32).toString("hex");
    for (let user of obUseri.useri) {
        if (user.username == req.body.username && req.body.parola == user.parola) {
            req.session.utilizator = user;
            break;
        }
    }

    res.render("pagini/index", {utilizator: req.session.utilizator});
})

app.get("/logout", function (req, res) {
    req.session.destroy();
    res.render("pagini/logout");
});

app.get("/*", function (req, res) {
    res.render("pagini" + req.url, {utilizator: req.session.utilizator}, function (err, rezultatRandare) {
        if (err) {
            res.render("pagini/404", {utilizator: req.session.utilizator});
        } else {
            res.send(rezultatRandare);
        }
    });
});

app.listen(8081);
console.log("Serverul a pornit!");