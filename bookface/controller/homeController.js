const getHome = (req, res) => {
    res.render('pages/home');
};

const getSecret = (req, res) => {
    if (req.session.userLoggedIn) {
        res.render('pages/secret', { username: req.session.username })
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    getHome,
    getSecret,
};