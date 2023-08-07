const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        // Lấy token ra từ header
        const token = req?.headers?.authorization?.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err)
                return res.status(401).json({
                    status: false,
                    message: "Invalid access token or da het han! :<",
                });

            req.user = decode;
            next();
        });
    } else {
        return res.status(401).json({
            status: false,
            message: "Require authentication! :<",
        });
    }
});

const verifyAdmin = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role !== "admin") {
        return res.status(401).json({
            status: false,
            message: "Require admin role! :<",
        });
    }
    next();
});

module.exports = {
    verifyAccessToken,
    verifyAdmin,
};
