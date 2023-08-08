import React from "react";
import { Routes, Route } from "react-router-dom";
import { Public, Home, Login } from "./pages/public";
import paths from "./ultils/paths";

const App = () => {
    return (
        <div className="">
            <Routes>
                <Route path={paths.PUBLIC} element={<Public />}>
                    <Route path={paths.HOME} element={<Home />} />
                    <Route path={paths.LOGIN} element={<Login />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
