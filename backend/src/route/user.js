const {
  getAllUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  getUserProfile,
  changePasswordForm
} = require('../controller/users.controller');

const router = require("express").Router();

const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.use(verifyToken);

router.route("/")
.get(verifyAdmin,getAllUsers);
// .post(verifyAdmin,createUser);

router.route("/profile").get(getUserProfile);

router.route("/:user_id")
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router.route('/:user_id/change-password')
.put(verifyToken,changePasswordForm);

module.exports = router;
