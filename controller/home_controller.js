module.exports.home = function (req, res) {
    const user = req.session.user;
    return res.render('home', {
        title: 'Home Page',
        user: user
    })

}