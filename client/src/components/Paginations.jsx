import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { apiGetPosts } from "../apis/post";
import { apiGetCategorys } from "../apis/category";

const Paginations = ({ posts, setLimits, isUpdate, type, categories }) => {
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
    } else {
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
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <div className="mt-[50px]">
            <Pagination
                current={currentPage}
                total={type === "posts" ? posts?.length : categories?.length} // Tổng số mục
                pageSize={5} // Số mục trên mỗi trang
                showSizeChanger={false}
                showQuickJumper={false}
                showTotal={(total) => `Có tất cả ${total} ${type === "posts" ? "bài đăng" : "danh mục"}`}
                onChange={handlePageChange}
                className="flex justify-between"
            />
        </div>
    );
};

export default Paginations;

// first, last, current, siblings, dots

// totalPages, currentPage,
