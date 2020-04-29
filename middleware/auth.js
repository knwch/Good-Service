//
// ─── FIREBASE DB ────────────────────────────────────────────────────────────────
//
const { admin } = require('../utils/firebase/firebase');

//
// ─── FUNCTION ───────────────────────────────────────────────────────────────────
//
const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1];
    } else {
        req.authToken = null;
    }
    next();
};
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── AUTHENTICATION ─────────────────────────────────────────────────────────────
//
exports.checkAuthen = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const user = await admin.auth().verifyIdToken(authToken);
            req.authId = user.uid;
            console.log(req.authId);
            return next();
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                success: false,
                error: 'You are not authorized'
            });
        }
    });
};
// ────────────────────────────────────────────────────────────────────────────────
