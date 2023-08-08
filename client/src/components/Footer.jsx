import React from "react";

const Footer = () => {
    return (
        <div className="border-t-[1px] border-[#d3d3d3] p-main">
            <div className="flex items-center justify-between py-[20px]">
                <div className="text-[26px] text-main font-bold leading-[70px]">
                    My Blog
                </div>
                <div className="flex items-center gap-[10px]">
                    <img
                        src="https://spiderum.com/assets/icons/appstore-badge.svg"
                        alt=""
                        className="object-cover"
                    />
                    <img
                        src="https://spiderum.com/assets/icons/appstore-badge.svg"
                        alt=""
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="border-b-[1px] border-[#d3d3d3] h-[1px] w-full"></div>
            <div className="my-[20px] text-center text-[20px] font-[600] text-inherit">
                © Bản quyền thuộc về Le Cong Quoc Duy - 2023
            </div>
        </div>
    );
};

export default Footer;
