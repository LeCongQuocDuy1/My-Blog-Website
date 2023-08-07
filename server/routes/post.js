const router = require("express").Router();
const controllers = require("../controllers/post");
const {
    verifyAccessToken,
    verifyAdmin,
} = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, verifyAdmin], controllers.createPost);
router.get("/", [verifyAccessToken], controllers.getPosts);
router.put("/:pid", [verifyAccessToken, verifyAdmin], controllers.updatePost);
router.delete(
    "/:pid",
    [verifyAccessToken, verifyAdmin],
    controllers.deletePost
);

router.get("/:pid", [verifyAccessToken], controllers.getPostById);

module.exports = router;
