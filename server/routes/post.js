const router = require("express").Router();
const { uploadCloudPost } = require("../config/cloudinary.config");
const controllers = require("../controllers/post");
const {
    verifyAccessToken,
    verifyAdmin,
} = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken], controllers.createPost);
router.get("/", [verifyAccessToken], controllers.getPosts);

router.put(
    "/upload/:pid",
    [verifyAccessToken],
    uploadCloudPost.single("image"),
    controllers.uploadImagePost
);
router.put("/:pid", [verifyAccessToken, verifyAdmin], controllers.updatePost);
router.delete(
    "/:pid",
    [verifyAccessToken, verifyAdmin],
    controllers.deletePost
);

router.get("/:pid", [verifyAccessToken], controllers.getPostById);

module.exports = router;
