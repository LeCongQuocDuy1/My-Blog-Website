import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import paths from "../../ultils/paths";
import { useSelector } from "react-redux";
import AdminSidebar from "../../components/sidebar/AdminSidebar";

const AdminLayout = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user);
    if (!isLoggedIn || !current || current.role !== "admin") {
        return <Navigate to={`/${paths.LOGIN}`} replace={true} />;
    }

    return (
        <div className="grid grid-cols-5">
            <div className="h-screen w-full relative">
                <AdminSidebar />
            </div>
            <div className="col-span-4 bg-[#d3d3d38d]">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
