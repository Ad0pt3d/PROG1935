const { validationResult } = require("express-validator");
const { FormModel } = require("../models/formModel");

const mangoJuicePrice = 2.99;
const berryJuicePrice = 1.99;
const appleJuicePrice = 2.49;

const getForm = (req, res) => {
    if (req.session.userLoggedIn) {
        res.render("pages/form", { username: req.session.username });
    } else {
        res.redirect("/login");
    }  
};

const postForm = (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render("pages/form", { errors: errors.array() });
    } else {
        let subtotal = 0;
        let taxRate = 0.13;
        let tax = 0;
        let total = 0;

        let customerName = req.body.customerName;
        let phoneNumber = req.body.phoneNumber;
        let mangoJuiceQuantity = parseInt(req.body.mangoJuiceQuantity) || 0;
        let berryJuiceQuantity = parseInt(req.body.berryJuiceQuantity) || 0;
        let appleJuiceQuantity = parseInt(req.body.appleJuiceQuantity) || 0;

        let mangoJuiceTotal = mangoJuicePrice * mangoJuiceQuantity;
        let berryJuiceTotal = berryJuicePrice * berryJuiceQuantity;
        let appleJuiceTotal = appleJuicePrice * appleJuiceQuantity;

        subtotal = mangoJuiceTotal + berryJuiceTotal + appleJuiceTotal;
        tax = subtotal * taxRate;
        total = subtotal + tax;

        subtotal = subtotal.toFixed(2);
        tax = tax.toFixed(2);
        total = total.toFixed(2)

        let data = {
            customerName,
            phoneNumber,
            mangoJuiceQuantity,
            berryJuiceQuantity,
            appleJuiceQuantity,
            subtotal,
            tax,
            total
        };

        let newForm = new FormModel({
            customerName,
            phoneNumber,
            mangoJuiceQuantity,
            berryJuiceQuantity,
            appleJuiceQuantity,
            subtotal,
            tax,
            total
        });

        newForm.save()
            .then(() => { console.log("Saved Form!") })
            .catch((error) => { console.log(error.message) })
        ;

        res.render("pages/success", data);
    }
};

const getAll = async (req, res) => {
    let all = await FormModel.find({}).exec();
    res.render("pages/all", { all });
};

module.exports = {
    getForm,
    postForm,
    getAll
};
