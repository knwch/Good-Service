const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateSignupInput = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.passwordConfirm = !isEmpty(data.passwordConfirm)
        ? data.passwordConfirm
        : '';
    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';

    if (Validator.isEmpty(data.email)) errors.email = `Email field is required`;
    if (!Validator.isEmail(data.email)) errors.email = `Email is invalid`;
    if (Validator.isEmpty(data.password))
        errors.password = `Password field is required`;
    if (!Validator.isLength(data.password, { min: 6, max: 30 }))
        errors.password = `Password must be 6 between 30`;
    if (Validator.isEmpty(data.passwordConfirm))
        errors.passwordConfirm = `Password confirm field is required`;
    if (!Validator.equals(data.password, data.passwordConfirm))
        errors.password = `Password must match`;
    if (Validator.isEmpty(data.fname))
        errors.firstname = `Firstname field is required`;
    if (Validator.isEmpty(data.lname))
        errors.lastname = `Lastname field is required`;

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
