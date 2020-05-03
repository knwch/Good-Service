const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../../controller/auth');

//
// ─── ROUTE ──────────────────────────────────────────────────────────────────────
//
router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
// ────────────────────────────────────────────────────────────────────────────────

module.exports = router;
