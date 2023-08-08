import React from "react";

const CategoryItem = ({ text }) => {
    return (
        <div className="inline-block border-[1px] border-[#c4c4c4] rounded-[47px] py-[0.5rem] px-[1rem] mb-[8px] text-[15px] mr-[6px]">
            {text || ""}
        </div>
    );
};
export default CategoryItem;
