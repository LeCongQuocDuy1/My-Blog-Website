import React from "react";
import { Pagination } from "antd";

const PaginationsUser = ({ users, currentPage, handlePageChange }) => {
    return (
        <div className="mt-[30px]">
            <Pagination
                current={currentPage}
                total={users?.length + 1} // Tổng số mục
                showSizeChanger={false}
                showQuickJumper={false}
                showTotal={(total) => `Có tất cả ${total - 1} người dùng`}
                onChange={handlePageChange}
                className="flex justify-center items-center"
            />
        </div>
    );
};

export default PaginationsUser;

// first, last, current, siblings, dots

// totalPages, currentPage,
