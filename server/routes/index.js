const userRoutes = require("./user");
const postRoutes = require("./post");
const categoryRoutes = require("./category");
const { notFound, errorHandler } = require("../middlewares/errorHandler");

const initRoutes = (app) => {
    app.use("/api/v1/user", userRoutes);
    app.use("/api/v1/post", postRoutes);
    app.use("/api/v1/category", categoryRoutes);

    app.use(notFound);
    app.use(errorHandler);
};

module.exports = initRoutes;
