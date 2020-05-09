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
const { uploadImageToStorage } = require('../utils/upload/uploadimg');
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

    const user = await admin.auth().createUser({
        email,
        password,
        displayName: `${fname} ${lname}`,
        photoURL: 'https://uppic.cc/d/6SMp'
    });
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
    const token = await user.user.getIdToken(true);

    res.status(200).json({
        success: true,
        token: `Bearer ${token}`
    });
});

// @desc    Signout user
// @route   Get /api/auth/signout
// @acess   Private
exports.signOut = asyncHandler(async (req, res, next) => {});

// @desc    Upload image profile
// @route   Post /api/auth/uplaod
// @acess   Private
exports.uploadImage = asyncHandler(async (req, res, next) => {
    // console.log(req.authId);
    const user = await admin.auth().getUser(req.authId);

    if (!user) {
        return next(new ErrorResponse(`User authentication`, 401));
    }

    if (!req.files) {
        return next(new ErrorResponse(`Image is required`, 400));
    }

    const file = req.files.file;
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`File is not image`, 400));
    }

    file.name = `${req.authId}.${Date.now()}.${file.name}`;

    const url = await uploadImageToStorage(file, 'users');

    // console.log(url);
    const _update = await admin
        .auth()
        .updateUser(req.authId, { photoURL: url });
    // console.log(_update.UserRecord);
    res.status(200).json({
        success: true,
        data: _update
    });
});
