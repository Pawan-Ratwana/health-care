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
                    title: user.name,
                    user: user.name
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
    const user = req.session.user;
    return res.render('user_signUp', {
        title: "Sign-Up",
        user: user
    });
};

// Controller method for rendering the sign-in page
module.exports.signIn = (req, res) => {
    const user = req.session.user;
    // console.log(user.name)
    return res.render('user_signIn', {
        title: "Sign In",
        user: user,
        successfull: "Sign In Successfull"
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
            return res.redirect('/users/profile/');
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




// Method to handle blood pressure submission
module.exports.submitBloodPressure = async (req, res) => {
    try {
        const { systolic, diastolic } = req.body;

        // Validate and process blood pressure data
        if (!systolic || !diastolic) {
            console.log('errorMessage', 'Please enter both systolic and diastolic pressure values.');
            req.flash('errorMessage', 'Please enter both systolic and diastolic pressure values.');
            return res.redirect('/users/profile');
        }

        // Suggest medicine based on blood pressure
        const medicine = suggestMedicine(parseInt(systolic), parseInt(diastolic));

        // Display success message or redirect back to profile page
        // console.log('successMessage', `Blood pressure submitted successfully. Suggested medicine: ${medicine}`);
        // req.flash('successMessage', `Blood pressure submitted successfully. Suggested medicine: ${medicine}`);

        // Display success message or redirect back to profile page
        const bloodPressureData = { systolic, diastolic };

        res.render('user_profile', {
            title: 'User Profile',
            user: req.user,
            successMessage: req.flash('successMessage'),
            bloodPressure: bloodPressureData,
            suggestedMedicine: medicine,
        });

    } catch (error) {
        console.error('Error submitting blood pressure:', error);
        // Display error message or redirect back to profile page with an error

        req.flash('errorMessage', 'Error submitting blood pressure. Please try again.');
        res.redirect('/users/profile');
    }
};

// Function to suggest medicine based on blood pressure
function suggestMedicine(systolic, diastolic) {
    // Simple example: Check blood pressure range and suggest medicine
    if (systolic < 120 && diastolic < 80) {
        return 'No specific medicine suggested. Your blood pressure is normal.';
    } else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
        return 'Consider lifestyle changes; no medication required.';
    } else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
        return 'Consult a healthcare professional for further evaluation.';
    } else {
        return 'Consult a healthcare professional for personalized advice.';
    }
}



module.exports.suggestMedicine = suggestMedicine;
