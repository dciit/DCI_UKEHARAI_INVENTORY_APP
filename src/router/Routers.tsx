import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Login from "../pages/login";
import Home from "../pages/home";
import Detail from "../pages/detail";
const Routers = () => {
    let base = import.meta.env.VITE_PATH;
    console.log(base)
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={`${base}`} element={<Home />} />
                    <Route path={`${base}/home`} element={<Home />} />
                    <Route path={`${base}/edit/:month`} element={<Detail />} />
                </Route>                            
                <Route path={`/*`} element={<Login />} />
                <Route path={`${base}/login`} element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;