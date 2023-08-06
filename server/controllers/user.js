const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const validateEmail = require("../ultils/validateEmail");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    // Kiểm tra đã nhập đầy đủ thông tin cần thiết chưa?
    if (!email || !password || !firstName || !lastName)
        throw new Error("Please enter full information! :<");

    // Kiểm tra trong csdl đã có tài khoản này chưa?
    const registered = await User.findOne({ email });
    if (registered)
        throw new Error("This user already exists, please try again! :<");

    // Kiểm tra đã đúng định dạng email chưa?
    if (!validateEmail(email))
        throw new Error("Invalid email, please try again! :<");

    // Hash password
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHashed = bcrypt.hashSync(password, salt);

    const response = await User.create({
        ...req.body,
        password: passwordHashed,
    });
    return res.status(200).json({
        status: response ? true : false,
        message: "Registered a user successfully! :>",
        response,
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra đã nhập đầy đủ thông tin cần thiết chưa?
    if (!email || !password)
        throw new Error("Please enter full information! :<");

    // Kiểm tra đã đúng định dạng email chưa?
    if (!validateEmail(email))
        throw new Error("Invalid email, please try again! :<");

    // Kiểm tra mật khẩu và email của người dùng này có trùng khớp trong hệ thống không?
    const response = await User.findOne({
        email,
    }).select("-refreshToken");

    if (response) {
        const checkPassword = bcrypt.compareSync(password, response.password);
        if (checkPassword) {
            const { password, role, ...userData } = response.toObject();

            // Tạo token
            const accessToken = generateAccessToken(response._id, role);

            // Tạo refresh token
            const refreshToken = generateRefreshToken(response._id);

            // Lưu refresh token vào db
            await User.findByIdAndUpdate(
                response._id,
                { refreshToken },
                { new: true }
            );

            // Lưu refresh token vào cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({
                status: response ? true : false,
                message: "Login successfully! :>",
                userData,
                accessToken, // bỏ token vào thông tin khi đăng nhập
            });
        } else {
            throw new Error(
                "Email or password is incorrect, please try again! :<"
            );
        }
    } else {
        throw new Error("Email or password is incorrect, please try again! :<");
    }
});

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select(
        "-refreshToken -role -password"
    );

    return res.status(200).json({
        status: user ? true : false,
        response: user ? user : "User not found! :<",
    });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    // Lấy token ra từ cookie
    const cookie = req.cookies;

    // Kiểm tra token có ko
    if (!cookie && !cookie.refreshToken)
        throw new Error("No refresh token in cookie");

    // Kiểm tra token có hợp lệ hoặc còn thời hạn ko
    jwt.verify(
        cookie.refreshToken,
        process.env.JWT_SECRET,
        async (err, decode) => {
            if (err) throw new Error("Invalid refresh token or da het han! :<");

            // Kiểm tra token có đúng với token đã lưu trong db ko
            const response = await User.findOne({
                _id: decode._id,
                refreshToken: cookie.refreshToken,
            });

            // Tạo token mới
            return res.status(200).json({
                status: response ? true : false,
                newAccessToken: response
                    ? generateAccessToken(response._id, response.role)
                    : "Refresh token is invalid! :<",
            });
        }
    );
});

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken)
        throw new Error("No refresh token in cookie");

    // Xóa refresh token ở db
    await User.findOneAndUpdate(
        { refreshToken: cookie.refreshToken },
        { refreshToken: "" },
        { new: true }
    );

    // Xóa refresh token ở cookie
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });

    return res.status(200).json({
        status: true,
        message: "Logout successfully",
    });
});

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
};
