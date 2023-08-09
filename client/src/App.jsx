import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Home, Login } from "./pages/public";
import paths from "./ultils/paths";

const App = () => {
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
