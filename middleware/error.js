const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    console.log(err);

    if (err.errorInfo && err.errorInfo.code === 'auth/email-already-exists') {
        const message = 'This email is already existed';
        error = new ErrorResponse(message, 400);
    }

    if (err.errorInfo && err.errorInfo.code === 'auth/wrong-password') {
        const message =
            'The password is invalid or the user does not have a password.';
        error = new ErrorResponse(message, 404);
    }

    if (err.errorInfo && err.errorInfo.code === 'auth/user-not-found') {
        const message = 'User not found';
        error = new ErrorResponse(message, 404);
    }

    //
    // ─── VALIDATION ERRORS ──────────────────────────────────────────────────────────
    //
    if (error.validateErrors) {
        error.message = error.validateErrors;
    }

    //
    // ─── RETURN RESPONSE ────────────────────────────────────────────────────────────
    //
    res.status(error.statusCode || 500).json({
        succes: false,
        errors: error.message || `Server Error`
    });
};

module.exports = errorHandler;
