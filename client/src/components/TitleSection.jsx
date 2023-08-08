import React from "react";

const TitleSection = ({ title }) => {
    return (
        <div className="mb-[20px]">
            <span className="text-[18px] font-bold">{title || ""}</span>
        </div>
    );
};

export default TitleSection;
