import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import paths from "../ultils/paths";
import { useSelector } from "react-redux";
import { getCurrent } from "../store/user/asyncAction";
import { useDispatch } from "react-redux";
import { MdLogout } from "react-icons/md";
import { logout } from "../store/user/userSlice";

const Header = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            if (isLoggedIn) dispatch(getCurrent());
        }, 300);

        return () => {
            clearTimeout(setTimeoutId);
        };
    }, [dispatch, isLoggedIn]);

    return (
        <div className="h-[70px] bg-white shadow-lg fixed top-0 right-0 left-0 p-main">
            <div className="flex justify-between w-full items-center">
                <div className="text-[26px] text-main font-bold leading-[70px]">
                    My Blog
                </div>
                <div className="flex items-center gap-[12px]">
                    {isLoggedIn ? (
                        <div className="flex items-center">
                            <img
                                src={current?.avatar}
                                alt="Avatar"
                                className="w-[48px] h-[48px] rounded-full object-cover"
                            />
                            <p className="text-[18px] font-[600]">{`${current?.firstName} ${current?.lastName}`}</p>
                            <button
                                onClick={() => dispatch(logout())}
                                className="flex items-center gap-[10px] ml-[15px] py-[8px] px-[16px] rounded-[26px] cursor-pointer text-[15px] font-[600] bg-error text-white"
                            >
                                Đăng xuất
                                <MdLogout size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="">
                            <Link
                                to={paths.LOGIN}
                                className="py-[8px] px-[16px] rounded-[26px] cursor-pointer text-[15px] font-[600] bg-main text-white"
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
