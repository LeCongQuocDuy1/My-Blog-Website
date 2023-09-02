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

    let queryCommand = Category.find(formatedQueries);
    
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
    const categories = await queryCommand;
    return res.status(200).json({
        status: categories ? true : false,
        counts: categories.length,
        categories: categories ? categories : "Can not get all categories",
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
