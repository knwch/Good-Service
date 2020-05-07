const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//
// ─── FIREBASE DB ────────────────────────────────────────────────────────────────
//
const { admin, firebase } = require('../utils/firebase/firebase');
const db = admin.firestore();
const post = db.collection('posts');
const FieldValue = admin.firestore.FieldValue;
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── VALIDATOR ──────────────────────────────────────────────────────────────────
//
const validatePost = require('../utils/validators/post');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── FUNCTION ───────────────────────────────────────────────────────────────────
//
const mapResult = (data) => {
    let result = [];
    data.map((post) => {
        const _post = {
            ...post.data(),
            id: post.id
        };
        result.push(_post);
    });
    return result;
};
// ────────────────────────────────────────────────────────────────────────────────

// @desc    Create Post
// @route   POST /api/posts/
// @acess   Private
exports.createPost = asyncHandler(async (req, res, next) => {
    const body = req.body;
    const { errors, isValid } = validatePost(body);

    // validate
    if (!isValid) {
        return next(new ErrorResponse(`Validation Error`, 400, errors));
    }

    // post data
    let currentTime = admin.firestore.Timestamp.fromDate(new Date());
    const postData = {
        ...body,
        postStatus: true,
        postBy: req.authId,
        creatadAt: currentTime,
        updateAt: null
    };

    const result = await post.add(postData);
    const _data = await post.doc(result.id).get('server');

    const final_data = {
        ..._data.data(),
        id: result.id
    };

    res.status(201).json({
        success: true,
        data: final_data
    });
});

// @desc    Get Post by id
// @route   Get /api/posts/:id
// @acess   Pubilc
exports.getPostbyId = asyncHandler(async (req, res, next) => {
    const postid = req.params.id;

    const _post = await post.doc(postid).get('server');

    if (!_post.exists) {
        return next(new ErrorResponse(`Post not found with id`, 404));
    }

    res.status(200).json({
        success: true,
        data: _post.data()
    });
});

// @desc    Get Post all
// @route   Get /api/posts/
// @acess   Pubilc
exports.getPost = asyncHandler(async (req, res, next) => {
    const snapshot = await post.where('postStatus', '==', true).get();

    const _post = mapResult(snapshot.docs);

    res.status(200).json({
        success: true,
        data: _post
    });
});

// @desc    status Post
// @route   Put /api/posts/:id
// @acess   Private
exports.statusPost = asyncHandler(async (req, res, next) => {
    const postid = req.params.id;
    const { statusPost } = req.body;

    const _post = await post.doc(postid).get('server');

    if (!_post.exists) {
        return next(new ErrorResponse(`Post not found with id`, 404));
    }

    if (_post.data().postBy !== req.authId) {
        return next(new ErrorResponse(`User authentication`, 401));
    }

    if (_post.data().postStatus === statusPost) {
        return next(
            new ErrorResponse(`Post is problem, please contact admin`, 400)
        );
    }

    const _update_post = await post.doc(postid).update({
        postStatus: statusPost,
        updateAt: FieldValue.serverTimestamp()
    });

    res.status(200).json({
        success: true
    });
});

// @desc    Get Post user
// @route   Put /api/posts/user/:id
// @acess   Private
exports.getPostUser = asyncHandler(async (req, res, next) => {
    const userid = req.params.id;

    const snapshot = await post.where('postBy', '==', userid).get();

    const _post = mapResult(snapshot.docs);

    res.status(200).json({
        success: true,
        data: _post
    });
});

// @desc    Delete Post
// @route   Put /api/posts/:id
// @acess   Private
exports.deletePost = asyncHandler(async (req, res, next) => {
    const postid = req.params.id;

    const checkPost = await post.doc(postid).get('server');

    if (!checkPost.exists) {
        return next(new ErrorResponse(`Post not found with id`, 404));
    }

    const _post = await post.doc(postid).delete();

    res.status({
        success: true
    });
});
