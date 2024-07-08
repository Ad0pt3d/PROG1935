const getAddOrder = (req, res) => {
    res.render('pages/addOrder');
};

const postAddOrder = (req, res) => {
    res.render("pages/reciept", { name: req.body.customerName });
    
};

module.exports = {
    getAddOrder,
    postAddOrder
};