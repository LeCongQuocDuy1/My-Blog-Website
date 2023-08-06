const router = require("express").Router();
const controllers = require("../controllers/user");
const { verifyAccessToken } = require("../middlewares/verifyToken");

// [POST] - create a user
router.post("/register", controllers.register);
// [POST] - login
router.post("/login", controllers.login);
// [GET] - get a user current
router.get("/current", verifyAccessToken, controllers.getCurrent);
// [POST] - refresh new a token
router.post("/refreshToken", controllers.refreshAccessToken);
// [GET] - logout
router.get("/logout", controllers.logout);

module.exports = router;
