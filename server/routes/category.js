const router = require("express").Router();
const controllers = require("../controllers/category");
const {
    verifyAccessToken,
    verifyAdmin,
} = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, verifyAdmin], controllers.createCategory);
router.get("/", [verifyAccessToken], controllers.getCategories);
router.get("/:cid", [verifyAccessToken], controllers.getCategoryById);
router.delete(
    "/:cid",
    [verifyAccessToken, verifyAdmin],
    controllers.deleteCategory
);
router.put(
    "/:cid",
    [verifyAccessToken, verifyAdmin],
    controllers.updateCategory
);

module.exports = router;
