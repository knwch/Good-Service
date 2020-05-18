const express = require('express');
const router = express.Router();
const { signUp, signIn, uploadImage } = require('../../controller/auth');
const { checkAuthen } = require('../../middleware/auth');
//
// ─── ROUTE ──────────────────────────────────────────────────────────────────────
//
router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/upload').post(checkAuthen, uploadImage);
// ────────────────────────────────────────────────────────────────────────────────

module.exports = router;
