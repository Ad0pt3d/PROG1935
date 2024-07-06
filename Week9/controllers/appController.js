const getHome = (req, res) => {
    res.render('pages/home');
};

const getProfile = (req, res) => {
    res.render('pages/profile');
};

module.exports = {
    getHome,
    getProfile,
};