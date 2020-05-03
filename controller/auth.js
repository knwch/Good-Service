const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
//
// ─── FIREBASE DB ────────────────────────────────────────────────────────────────
//
const { admin, firebase } = require('../utils/firebase/firebase');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── VALIDATION ─────────────────────────────────────────────────────────────────
//
const validateSignupInput = require('../utils/validators/signup');
const validateSignIn = require('../utils/validators/signin');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── FUNCTION ───────────────────────────────────────────────────────────────────
//

// ────────────────────────────────────────────────────────────────────────────────

// @desc    Signup user
// @route   POST /api/auth/signup
// @acess   Public
exports.signUp = asyncHandler(async (req, res, next) => {
    const { email, password, passwordConfirm, fname, lname } = req.body;
    const { errors, isValid } = validateSignupInput(req.body);

    // validate
    if (!isValid) {
        return next(new ErrorResponse(`Validation Error`, 400, errors));
    }

    const user = await admin
        .auth()
        .createUser({ email, password, displayName: `${fname} ${lname}` });
    // const result = await db
    //     .collection('users')
    //     .doc(user.uid)
    //     .set({ fname, lname });

    res.status(201).json({
        success: true,
        user: user
    });
});

// @desc    Signin user
// @route   POST /api/auth/signin
// @acess   Public
exports.signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const { errors, isValid } = validateSignIn(req.body);

    // validate
    if (!isValid) {
        return next(new ErrorResponse(`Validation Error`, 400, errors));
    }

    // signin
    const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

    // get token
    const token = await user.user.getIdToken();

    res.status(200).json({
        success: true,
        token: token
    });
});
