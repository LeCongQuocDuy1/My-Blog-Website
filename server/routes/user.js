const router = require("express").Router();
const controllers = require("../controllers/user");
const {
    verifyAccessToken,
    verifyAdmin,
} = require("../middlewares/verifyToken");

// [POST] - create a user
router.post("/register", controllers.register);
// [POST] - login
router.post("/login", controllers.login);
// [GET] - get a user current
router.get("/current", [verifyAccessToken], controllers.getCurrent);
// [POST] - refresh new a token
router.post("/refreshToken", controllers.refreshAccessToken);
// [GET] - logout
router.get("/logout", controllers.logout);
// [GET] - Get all users
router.get("/", [verifyAccessToken, verifyAdmin], controllers.getUsers);
// [GET] - Get user by id
router.get("/:uid", [verifyAccessToken, verifyAdmin], controllers.getUserById);
// [DELETE] - Delete user
router.delete("/", [verifyAccessToken, verifyAdmin], controllers.deleteUser);
// [UPDATE] - Update user
router.put("/current", [verifyAccessToken], controllers.updateUser);
// [UPDATE] - Update user by admin
router.put(
    "/:uid",
    [verifyAccessToken, verifyAdmin],
    controllers.updateUserByAdmin
);

module.exports = router;
