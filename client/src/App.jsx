import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Home, Login } from "./pages/public";
import paths from "./ultils/paths";
import { getCategories } from "./store/app/asyncAction";
import { getPosts } from "./store/post/asyncAction";
import { useDispatch } from "react-redux";

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
                </Route>
                <Route path={paths.LOGIN} element={<Login />} />
            </Routes>
        </div>
    );
};

export default App;
