import React from "react";
import { Link } from "react-router-dom";
import paths from "../ultils/paths";

const Header = () => {
    return (
        <div className="h-[70px] bg-white shadow-lg fixed top-0 right-0 left-0 p-main">
            <div className="flex justify-between w-full items-center">
                <div className="text-[26px] text-main font-bold leading-[70px]">
                    My Blog
                </div>
                <div className="flex items-center gap-[12px]">
                    <Link
                        to={"/"}
                        className="py-[8px] px-[16px] rounded-[26px] cursor-pointer text-[15px] font-[600] border-[1px] border-[#000] bg-white text-black"
                    >
                        Đăng ký
                    </Link>
                    <Link
                        to={paths.LOGIN}
                        className="py-[8px] px-[16px] rounded-[26px] cursor-pointer text-[15px] font-[600] bg-main text-white"
                    >
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
