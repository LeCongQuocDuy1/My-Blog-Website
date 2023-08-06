const router = require("express").Router();
const controllers = require("../controllers/user");

// [POST] - create a user
router.post("/register", controllers.register);
// [POST] - login
router.post("/login", controllers.login);

module.exports = router;
