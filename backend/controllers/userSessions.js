
const setUserSession = (req, res, next) => {

    console.log(req.session.authenticated);
    if (req.session.authenticated) {

        next()
    } else {

        res.redirect('/Eventr/api/v1/merchant/login');
    }
}

module.exports = { setUserSession }