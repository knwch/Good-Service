const express = require('express');
const router = express.Router();
const {
    getPostbyId,
    createPost,
    getPost,
    statusPost,
    getPostUser,
    deletePost
} = require('../../controller/post');
//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
//
const { checkAuthen } = require('../../middleware/auth');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── ROUTE ──────────────────────────────────────────────────────────────────────
//
router.route('/').get(getPost).post(checkAuthen, createPost);
router
    .route('/:id')
    .get(getPostbyId)
    .put(checkAuthen, statusPost)
    .delete(checkAuthen, deletePost);
router.route('/user/:id').get(checkAuthen, getPostUser);
// ────────────────────────────────────────────────────────────────────────────────

module.exports = router;
