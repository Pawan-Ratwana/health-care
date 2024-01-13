// Controller method for user profile
const User = require('../model/user');

// Controller method for user profile
module.exports.profile = async (req, res) => {
    try {
        // check the user_id in cookies
        if (req.cookies.user_id) {
            // find the user
            const user = await User.findById(req.cookies.user_id);

            // if user is found then redirect to the profile
            if (user) {
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            }

            // if user not found 
            console.log("user not found");
            return res.redirect('/users/sign-in');
        } else {
            // user is not in cookies
            console.log("User not in cookies");
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.log("error finding user", err);
        return res.redirect('/users/sign-in');
    }
};


// Controller method for rendering the sign-up page
module.exports.signUp = (req, res) => {
    return res.render('user_signUp', {
        title: "Sign-Up"
    });
};

// Controller method for rendering the sign-in page
module.exports.signIn = (req, res) => {
    return res.render('user_signIn', {
        title: "Sign In"
    });
};

// Controller method for creating a new user
module.exports.create = async (req, res) => {
    try {
        // ... (previous code)

        // Check if the user with the given email already exists
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            // If the user doesn't exist, create a new user
            const newUser = await User.create(req.body);
            req.flash('success', 'User created successfully');
            return res.redirect('/users/sign-in');
        } else {
            // If the user already exists, redirect back with an error flash message
            req.flash('error', 'User with this email already exists');
            return res.redirect('back');
        }
    } catch (err) {
        console.error("Error in finding/creating the user:", err);
        // If there is an error, redirect back with an error flash message
        req.flash('error', 'Error in finding/creating the user');
        res.redirect('back');
    }
};

// Controller method for handling user sessions
module.exports.createSession = async (req, res) => {
    // Implement session creation logic here
    try {
        // find the user
        const user = await User.findOne({ email: req.body.email });

        // handle user found
        if (user) {
            // handle the password which does not match
            if (user.password !== req.body.password) {
                console.log("incorrect password");
                req.flash('error', 'Incorrect password');
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id', user.id);
            req.flash('success', 'Logged in successfully');
            return res.redirect('/users/profile');
        } else {
            req.flash('error', 'User not found');
            return res.redirect('back');
        }
    } catch (err) {
        console.log("Error in finding/creating sign-in:", err);
        req.flash('error', 'Error in sign-in');
        return res.redirect('back');
    }
};


module.exports.signOut = (req, res) => {
    res.clearCookie('user_id');
    return res.redirect('/')
}