module.exports.profile = function (req, res) {
    res.end("<h1>User Profile</h1>")
}

module.exports.signUp = (req, res) => {
    return res.render('user_signUp', {
        title: "Sign-Up"
    })
}

module.exports.signIn = (req, res) => {
    return res.render('user_signIn', {
        title: "Sign In"
    })
}