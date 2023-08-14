import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import paths from "../../ultils/paths";
import { useSelector } from "react-redux";

const AdminLayout = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user);
    console.log(current);
    if (!isLoggedIn || !current || current.role !== "admin") {
        return <Navigate to={`/${paths.LOGIN}`} replace={true} />;
    }

    return (
        <div>
            <h1>AdminLayout</h1>
            <Outlet />
        </div>
    );
};

export default AdminLayout;
