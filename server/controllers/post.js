const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createPost = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing input");

    // Kiểm tra có tiêu đề ko và tạo slug
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const newPost = await Post.create(req.body);
    return res.status(200).json({
        status: newPost ? true : false,
        createdPost: newPost ? newPost : "Cannot create a new post!",
    });
});

const getPosts = asyncHandler(async (req, res) => {
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

    // Filtering (by title)
    if (queries?.title)
        formatedQueries.title = { $regex: queries.title, $options: "i" }; // Tìm gần đúng
    let queryCommand = Post.find(formatedQueries).populate("category"); // pending

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
    const posts = await queryCommand;
    return res.status(200).json({
        status: posts ? true : false,
        counts: posts.length,
        posts: posts ? posts : "Can not get all posts",
    });
});

const getPostById = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!pid) throw new Error("Missing input id");
    const response = await Post.findById(pid).populate("category");
    return res.status(200).json({
        status: response ? true : false,
        post: response,
    });
});

const deletePost = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!pid) throw new Error("Missing input id");
    const response = await Post.findByIdAndDelete(pid);
    return res.status(200).json({
        status: response ? true : false,
        response: response
            ? "Post deleted successfully! :>"
            : "Post is not found! Please try again :<",
    });
});

const updatePost = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!pid || Object.keys(req.body).length === 0)
        throw new Error("Missing input!");

    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);

    const response = await Post.findByIdAndUpdate(pid, req.body, {
        new: true,
    });

    return res.status(200).json({
        status: response ? true : false,
        response: response
            ? response
            : "Update post failed! Please try again :<",
    });
});

const uploadImagePost = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!req.file) throw new Error("Missing input image");
    const response = await Post.findByIdAndUpdate(
        pid,
        {
            image: req.file.path,
        },
        {
            new: true,
        }
    );
    return res.status(200).json({
        status: response ? true : false,
        updatedProduct: response
            ? response
            : "Update image post failed! Please try again :<",
    });
});

module.exports = {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    updatePost,
    uploadImagePost,
};
