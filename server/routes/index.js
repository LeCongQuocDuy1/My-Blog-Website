const userRoutes = require("./user");
const postRoutes = require("./post");
const { notFound, errorHandler } = require("../middlewares/errorHandler");

const initRoutes = (app) => {
    app.use("/api/v1/user", userRoutes);
    app.use("/api/v1/post", postRoutes);

    app.use(notFound);
    app.use(errorHandler);
};

module.exports = initRoutes;
