// const User = require('../model/user');

// // Normal blood pressure range
// const normalSystolicRange = { min: 90, max: 120 };
// const normalDiastolicRange = { min: 60, max: 80 };
// const emergencyThresholdLow = 60; // Adjust this threshold based on your requirements
// const emergencyThresholdHigh = 180; // Adjust this threshold based on your requirements


// // Method to handle blood pressure submission
// module.exports.submitBloodPressure = async (req, res) => {
//     try {
//         const { systolic, diastolic } = req.body;

//         // Validate and process blood pressure data
//         if (!systolic || !diastolic) {
//             req.flash('errorMessage', 'Please enter both systolic and diastolic pressure values.');
//             return res.redirect('/users/profile');
//         }

//         // Suggest medicine based on blood pressure
//         const medicine = suggestMedicine(parseInt(systolic), parseInt(diastolic));

//         // Display success message or redirect back to profile page
//         req.flash('successMessage', `Blood pressure submitted successfully. Suggested medicine: ${medicine}`);
//         res.redirect('/users/profile');
//     } catch (error) {
//         console.error('Error submitting blood pressure:', error);
//         // Display error message or redirect back to profile page with an error
//         req.flash('errorMessage', 'Error submitting blood pressure. Please try again.');
//         res.redirect('/users/profile');
//     }
// };

// // Function to suggest medicine based on blood pressure
// function suggestMedicine(systolic, diastolic) {
//     // Simple example: Check blood pressure range and suggest medicine
//     if (systolic < 120 && diastolic < 80) {
//         return 'No specific medicine suggested. Your blood pressure is normal.';
//     } else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
//         return 'Consider lifestyle changes; no medication required.';
//     } else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
//         return 'Consult a healthcare professional for further evaluation.';
//     } else {
//         return 'Consult a healthcare professional for personalized advice.';
//     }
// }

// module.exports.suggestMedicine = suggestMedicine;