const userRoutes = require("./user");
const { notFound, errorHandler } = require("../middlewares/errorHandler");

const initRoutes = (app) => {
    app.use("/api/v1/user", userRoutes);

    app.use(notFound);
    app.use(errorHandler);
};

module.exports = initRoutes;
