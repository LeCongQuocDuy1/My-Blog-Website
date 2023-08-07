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
    const response = await Post.find();
    return res.status(200).json({
        status: response ? true : false,
        posts: response,
    });
});

const getPostById = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!pid) throw new Error("Missing input id");
    const response = await Post.findById(pid);
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

module.exports = {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    updatePost,
};
