import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { apiGetPosts } from "../apis/post";
import { apiGetCategorys } from "../apis/category";
import { apiGetUsers } from "../apis/user";

const Paginations = ({ posts, setLimits, isUpdate, type, categories, users }) => {
    const [currentPage, setCurrentPage] = useState(1);

    if(type === "posts") {
        const fetchPostsLimit = async (params) => {
            const response = await apiGetPosts(params);
            if (response.status) setLimits(response.posts);
        };

        useEffect(() => {
            fetchPostsLimit({
                page: currentPage,
                limit: 5,
            });
        }, [currentPage, isUpdate]);
    } else if (type === "categories") {
        const fetchCategorysLimit = async (params) => {
            const response = await apiGetCategorys(params);
            if (response.status) setLimits(response.categories);
        };

        useEffect(() => {
            fetchCategorysLimit({
                page: currentPage,
                limit: 5,
            });
        }, [currentPage, isUpdate]);
    } else {
        const fetchUsersLimit = async (params) => {
            const response = await apiGetUsers(params);
            if (response.status) setLimits(response.users);
        };

        useEffect(() => {
            fetchUsersLimit({
                page: currentPage,
                limit: 5,
            });
        }, [currentPage, isUpdate]);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <div className="mt-[50px]">
            <Pagination
                current={currentPage}
                total={type === "posts" ? posts?.length : type === "categories" ? categories?.length : users?.length} // Tổng số mục
                pageSize={5} // Số mục trên mỗi trang
                showSizeChanger={false}
                showQuickJumper={false}
                showTotal={(total) => `Có tất cả ${total} ${type === "posts" ? "bài đăng" : type === "categories" ? "danh mục" : "người dùng"}`}
                onChange={handlePageChange}
                className="flex justify-between"
            />
        </div>
    );
};

export default Paginations;

// first, last, current, siblings, dots

// totalPages, currentPage,
