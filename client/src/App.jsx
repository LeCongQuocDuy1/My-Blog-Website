import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Home, Login, Detail, Category } from "./pages/public";
import paths from "./ultils/paths";
import { getCategories } from "./store/app/asyncAction";
import { getPosts } from "./store/post/asyncAction";
import { useDispatch } from "react-redux";
import {
    AdminLayout,
    CreatePost,
    Dashboard,
    ManageCategory,
    ManagePost,
    ManageUser,
} from "./pages/admin/";
import { MemberLayout, Profile } from "./pages/member";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getCategories());
    }, []);

    return (
        <div className="">
            <Routes>
                <Route path={paths.LAYOUT} element={<Layout />}>
                    <Route path={paths.HOME} element={<Home />} />
                    <Route path={paths.DETAIL_POST__PID} element={<Detail />} />
                    <Route
                        path={paths.DETAIL_CATEGORY__CID}
                        element={<Category />}
                    />
                    <Route path={paths.ALL} element={<Home />} />
                </Route>
                <Route path={paths.ADMIN} element={<AdminLayout />}>
                    <Route path={paths.DASHBOARD} element={<Dashboard />} />
                    <Route path={paths.MANAGE_POST} element={<ManagePost />} />
                    <Route
                        path={paths.MANAGE_CATEGORY}
                        element={<ManageCategory />}
                    />
                    <Route path={paths.MANAGE_USER} element={<ManageUser />} />
                    <Route path={paths.CREATE_POST} element={<CreatePost />} />
                </Route>

                <Route path={paths.MEMBER} element={<MemberLayout />}>
                    <Route path={paths.PROFILE} element={<Profile />} />
                </Route>

                <Route path={paths.LOGIN} element={<Login />} />
            </Routes>
        </div>
    );
};

export default App;
