import React, { Fragment, useState } from "react";
import paths from "../../ultils/paths";
import { Link, NavLink } from "react-router-dom";
import icons from "../../ultils/icons";
// import { adminSidebar } from "../../ultils/constant";

const AdminSidebar = () => {
    const [actived, setActived] = useState([]);

    const handleShowTab = (tabId) => {
        if (actived.some((item) => item === tabId)) {
            setActived((prev) => prev.filter((item) => item !== tabId));
        } else {
            setActived((prev) => [...prev, tabId]);
        }
    };

    return (
        <div className="">
            <Link
                to={`/${paths.HOME}`}
                className="py-[15px] px-[30px] text-[26px] text-main font-bold text-center w-full block"
            >
                My Blog
            </Link>
            <div className="">
                {/* {adminSidebar.map((sidebar) => (
                    <Fragment key={sidebar.id}>
                        {sidebar.type === "single" && (
                            <NavLink to={sidebar.path}>
                                <span>{sidebar.icon}</span>
                                <span>{sidebar.text}</span>
                            </NavLink>
                        )}
                        {sidebar.type === "parent" && (
                            <div className="">
                                <div className="">
                                    <span>{sidebar.icon}</span>
                                    <span>{sidebar.text}</span>
                                </div>
                                <div className="">
                                    {sidebar.submenu.map((item) => (
                                        <NavLink
                                            key={sidebar.id}
                                            to={item.path}
                                        >
                                            {sidebar.text}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Fragment>
                ))} */}
                <NavLink
                    to={`/${paths.ADMIN}/${paths.DASHBOARD}`}
                    className={({ isActive }) =>
                        isActive
                            ? `flex items-center px-[15px] py-[10px] bg-[#d3d3d3] hover:bg-[#d3d3d3]`
                            : `flex items-center px-[15px] py-[10px] hover:bg-[#d3d3d378]`
                    }
                >
                    <span className="text-[20px] mr-[5px]">
                        <icons.AiOutlineDashboard />
                    </span>
                    <span className="text-[16px] font-[600]">Dashboard</span>
                </NavLink>
                <div className="">
                    <div
                        onClick={() => handleShowTab(1)}
                        className="flex items-center justify-between px-[15px] py-[10px] hover:bg-[#d3d3d378] cursor-pointer"
                    >
                        <div className="flex items-center">
                            <span className="text-[20px] mr-[5px]">
                                <icons.BiNews />
                            </span>
                            <span className="text-[16px] font-[600]">
                                Manage Post
                            </span>
                        </div>
                        {!actived.some((id) => id === 1) ? (
                            <icons.FiChevronDown className="text-[20px]" />
                        ) : (
                            <icons.FiChevronUp className="text-[20px]" />
                        )}
                    </div>
                    {actived.some((id) => id === 1) && (
                        <div className="flex flex-col">
                            <NavLink
                                to={`/${paths.ADMIN}/${paths.CREATE_POST}`}
                                className={({ isActive }) =>
                                    isActive
                                        ? `flex items-center pl-[40px] px-[15px] py-[10px] bg-[#d3d3d3] hover:bg-[#d3d3d3]`
                                        : `flex items-center pl-[40px] px-[15px] py-[10px] hover:bg-[#d3d3d378]`
                                }
                            >
                                <span className="text-[16px] font-[600]">
                                    Create Post
                                </span>
                            </NavLink>
                            <NavLink
                                to={`/${paths.ADMIN}/${paths.MANAGE_POST}`}
                                className={({ isActive }) =>
                                    isActive
                                        ? `flex items-center pl-[40px] px-[15px] py-[10px] bg-[#d3d3d3] hover:bg-[#d3d3d3]`
                                        : `flex items-center pl-[40px] px-[15px] py-[10px] hover:bg-[#d3d3d378]`
                                }
                            >
                                <span className="text-[16px] font-[600]">
                                    Manage Post
                                </span>
                            </NavLink>
                        </div>
                    )}
                </div>
                <div className="">
                    <div
                        onClick={() => handleShowTab(2)}
                        className="flex items-center justify-between px-[15px] py-[10px] hover:bg-[#d3d3d378] cursor-pointer"
                    >
                        <div className="flex items-center">
                            <span className="text-[20px] mr-[5px]">
                                <icons.BiSolidCategory />
                            </span>
                            <span className="text-[16px] font-[600]">
                                Manage Category
                            </span>
                        </div>
                        {!actived.some((id) => id === 2) ? (
                            <icons.FiChevronDown className="text-[20px]" />
                        ) : (
                            <icons.FiChevronUp className="text-[20px]" />
                        )}
                    </div>
                    {actived.some((id) => id === 2) && (
                        <div className="flex flex-col">
                            <NavLink
                                to={`/${paths.ADMIN}/${paths.CREATE_POST}`}
                                className={({ isActive }) =>
                                    isActive
                                        ? `flex items-center pl-[40px] px-[15px] py-[10px] bg-[#d3d3d3] hover:bg-[#d3d3d3]`
                                        : `flex items-center pl-[40px] px-[15px] py-[10px] hover:bg-[#d3d3d378]`
                                }
                            >
                                <span className="text-[16px] font-[600]">
                                    Create Category
                                </span>
                            </NavLink>
                            <NavLink
                                to={`/${paths.ADMIN}/${paths.MANAGE_CATEGORY}`}
                                className={({ isActive }) =>
                                    isActive
                                        ? `flex items-center pl-[40px] px-[15px] py-[10px] bg-[#d3d3d3] hover:bg-[#d3d3d3]`
                                        : `flex items-center pl-[40px] px-[15px] py-[10px] hover:bg-[#d3d3d378]`
                                }
                            >
                                <span className="text-[16px] font-[600]">
                                    Manage Category
                                </span>
                            </NavLink>
                        </div>
                    )}
                </div>
                <div className="">
                    <div
                        onClick={() => handleShowTab(3)}
                        className="flex items-center justify-between px-[15px] py-[10px] hover:bg-[#d3d3d378] cursor-pointer"
                    >
                        <div className="flex items-center">
                            <span className="text-[20px] mr-[5px]">
                                <icons.FaUsers />
                            </span>
                            <span className="text-[16px] font-[600]">
                                Manage User
                            </span>
                        </div>
                        {!actived.some((id) => id === 3) ? (
                            <icons.FiChevronDown className="text-[20px]" />
                        ) : (
                            <icons.FiChevronUp className="text-[20px]" />
                        )}
                    </div>
                    {actived.some((id) => id === 3) && (
                        <div className="flex flex-col">
                            <NavLink
                                to={`/${paths.ADMIN}/${paths.CREATE_POST}`}
                                className={({ isActive }) =>
                                    isActive
                                        ? `flex items-center pl-[40px] px-[15px] py-[10px] bg-[#d3d3d3] hover:bg-[#d3d3d3]`
                                        : `flex items-center pl-[40px] px-[15px] py-[10px] hover:bg-[#d3d3d378]`
                                }
                            >
                                <span className="text-[16px] font-[600]">
                                    Create User
                                </span>
                            </NavLink>
                            <NavLink
                                to={`/${paths.ADMIN}/${paths.MANAGE_USER}`}
                                className={({ isActive }) =>
                                    isActive
                                        ? `flex items-center pl-[40px] px-[15px] py-[10px] bg-[#d3d3d3] hover:bg-[#d3d3d3]`
                                        : `flex items-center pl-[40px] px-[15px] py-[10px] hover:bg-[#d3d3d378]`
                                }
                            >
                                <span className="text-[16px] font-[600]">
                                    Manage User
                                </span>
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
