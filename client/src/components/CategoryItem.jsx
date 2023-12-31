import React from "react";
import { NavLink } from "react-router-dom";

const CategoryItem = ({ category }) => {
    return (
        <NavLink
            to={`/danh-muc/${category._id}`}
            className="inline-block border-[1px] border-[#c4c4c4] rounded-[47px] py-[0.5rem] px-[1rem] mb-[8px] text-[15px] mr-[6px]"
        >
            {category.title || ""}
        </NavLink>
    );
};
export default CategoryItem;
