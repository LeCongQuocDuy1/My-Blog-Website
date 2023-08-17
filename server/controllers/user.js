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
            const { password, role, refreshToken, ...userData } =
                response.toObject();

            // Tạo token
            const accessToken = generateAccessToken(response._id, role);

            // Tạo refresh token
            const newRefreshToken = generateRefreshToken(response._id);

            // Lưu refresh token vào db
            await User.findByIdAndUpdate(
                response._id,
                { refreshToken: newRefreshToken },
                { new: true }
            );

            // Lưu refresh token vào cookie
            res.cookie("refreshToken", newRefreshToken, {
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
    const user = await User.findById(_id).select("-refreshToken -password");

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

const getUsers = asyncHandler(async (req, res) => {
    // const response = await User.find().select("-refreshToken -role -password");
    // return res.status(200).json({
    //     status: response ? true : false,
    //     users: response,
    // });

    const queries = { ...req.query };

    // Tách các giá trị đặc biệt
    const excludeFields = ["limit", "sort", "page", "fields"];
    excludeFields.forEach((element) => delete queries[element]);

    // $gt: >
    // $gte: >=
    // $lt: <
    // $lte: <=

    // Format lại các operators cho đúng cú pháp của mongodb
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
        /\b(gt|gte|lt|lte)\b/g,
        (matchedElement) => `$${matchedElement}`
    );
    const formatedQueries = JSON.parse(queryString);

    // // Filtering (by email)
    // if (queries?.email)
    //     formatedQueries.email = { $regex: queries.email, $options: "i" }; // Tìm gần đúng
    // let queryCommand = User.find(formatedQueries);

    // // Filtering (by firstName)
    if (queries?.firstName)
        formatedQueries.firstName = { $regex: queries.firstName, $options: "i" }; // Tìm gần đúng
    let queryCommand = User.find(formatedQueries);

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        queryCommand = queryCommand.sort(sortBy);
    } else {
        queryCommand = queryCommand.sort("createdAt");
    }

    // Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        queryCommand = queryCommand.select(fields);
    } else {
        queryCommand = queryCommand.select("-__v");
    }

    // Pagination
    // limit: số bài đăng muốn lấy
    // skip: bỏ qua
    // page: trang hiện tại

    // Ví dụ: trang 10, mỗi trang 2 bài
    // page = 10, limit 2 => skip => 18 => trang 10 sẽ có 19 và 20

    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    //EXECUTE QUERY
    const response = await queryCommand;
    return res.status(200).json({
        status: response ? true : false,
        counts: response.length,
        users: response ? response : "Can not get all users",
    });
});

const getUserById = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    if (!uid) throw new Error("Missing input!");
    const user = await User.findById(uid).select("-refreshToken -password");

    return res.status(200).json({
        status: user ? true : false,
        response: user ? user : "User not found! :<",
    });
});

const deleteUser = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    if (!uid) throw new Error("Missing input id");
    const response = await User.findByIdAndDelete(uid);
    return res.status(200).json({
        status: response ? true : false,
        response: response
            ? "User deleted successfully! :>"
            : "User is not found! Please try again :<",
    });
});

// Update role of user
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id || Object.keys(req.body).length === 0)
        throw new Error("Missing input!");
    const response = await User.findByIdAndUpdate(_id, req.body, {
        new: true,
    }).select("-refreshToken -role -password");

    return res.status(200).json({
        status: response ? true : false,
        response: response ? response : "Update user failed! Please try again :<",
        message: response ? "Updated a user successfully!" : "Update user failed! Please try again :<",
    });
});

// Update role of admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error("Missing input!");
    const response = await User.findByIdAndUpdate(uid, req.body, {
        new: true,
    }).select("-refreshToken -role -password");

    return res.status(200).json({
        status: response ? true : false,
        response: response
            ? response
            : "Update user failed! Please try again :<",
        message: response ? "Updated a user successfully!" : "Update user failed! Please try again :<",
        });
});

const uploadAvatarUser = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    if (!req.file) throw new Error("Missing input image");
    const response = await User.findByIdAndUpdate(
        uid,
        {
            avatar: req.file.path,
        },
        {
            new: true,
        }
    );
    return res.status(200).json({
        status: response ? true : false,
        updatedUser: response
            ? response
            : "Update avatar user failed! Please try again :<",
    });
});

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    uploadAvatarUser,
};
