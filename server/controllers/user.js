const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const validateEmail = require("../ultils/validateEmail");
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
    });
    if (response) {
        const checkPassword = bcrypt.compareSync(password, response.password);
        if (checkPassword) {
            const { password, role, ...userData } = response.toObject();
            return res.status(200).json({
                status: response ? true : false,
                message: "Login successfully! :>",
                userData,
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

module.exports = {
    register,
    login,
};
