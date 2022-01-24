const router = require("express").Router();
const {
    createAccount,
    loginUser,
    refreshToken,
    forgotPassword,
    resetPassword,
    verifyResetToken,
    logOutUser
} = require('../controller/auth.controller');
const verifyLogout = require('../middleware/logout');

router.route('/sign-up').post(createAccount);
router.post('/login', loginUser);
router.route('/logout').post(verifyLogout, logOutUser);
router.get("/test", (req, res) => {
    res.cookie("test: ", "1234");
    return res.status(200).json("1234");
})

router.post("/check-token", verifyResetToken);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.post("/refresh-token", refreshToken);
module.exports = router;