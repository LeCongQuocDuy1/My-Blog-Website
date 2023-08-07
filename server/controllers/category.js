const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
    const response = await Category.create(req.body);
    return res.status(200).json({
        status: response ? true : false,
        createdCategory: response ? response : "Can't create a category! :<",
    });
});

const getCategories = asyncHandler(async (req, res) => {
    const response = await Category.find();
    return res.status(200).json({
        status: response ? true : false,
        categories: response,
    });
});

const getCategoryById = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    if (!cid) throw new Error("Missing input!");
    const category = await Category.findById(cid);

    return res.status(200).json({
        status: category ? true : false,
        response: category ? category : "Category not found! :<",
    });
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    if (!cid) throw new Error("Missing input id");
    const response = await Category.findByIdAndDelete(cid);
    return res.status(200).json({
        status: response ? true : false,
        response: response
            ? "Category deleted successfully! :>"
            : "Category is not found! Please try again :<",
    });
});

const updateCategory = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    if (!cid || Object.keys(req.body).length === 0)
        throw new Error("Missing input!");
    const response = await Category.findByIdAndUpdate(cid, req.body, {
        new: true,
    });

    return res.status(200).json({
        status: response ? true : false,
        response: response
            ? response
            : "Update category failed! Please try again :<",
    });
});

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
};
