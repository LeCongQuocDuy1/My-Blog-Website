import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import paths from "../../ultils/paths";
import { useSelector } from "react-redux";

const MemberLayout = () => {
    const { isLoggedIn, current } = useSelector((state) => state.user);
    if (!isLoggedIn || !current)
        return <Navigate to={`/${paths.LOGIN}`} replace={true} />;

    return (
        <div>
            <h1>MEMBER LAYOUT</h1>
            <Outlet />
        </div>
    );
};

export default MemberLayout;
