import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { apiGetPosts } from "../apis/post";

const Paginations = ({ posts, setPostsLimit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const fetchPostsLimit = async (params) => {
            const response = await apiGetPosts(params);
            if (response.status) setPostsLimit(response.posts);
        };
        fetchPostsLimit({
            page: currentPage,
            limit: 5,
        });
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
        // Thực hiện các thao tác khi trang thay đổi, ví dụ: gọi API để lấy dữ liệu trang mới
    };

    return (
        <div className="mt-[50px]">
            <Pagination
                current={currentPage}
                total={posts?.length} // Tổng số mục
                pageSize={5} // Số mục trên mỗi trang
                showSizeChanger={false}
                showQuickJumper={false}
                showTotal={(total) => `Có tất cả ${total} bài đăng`}
                onChange={handlePageChange}
                className="flex justify-between"
            />
        </div>
    );
};

export default Paginations;

// first, last, current, siblings, dots

// totalPages, currentPage,
