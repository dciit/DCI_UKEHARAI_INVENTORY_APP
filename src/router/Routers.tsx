import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Login from "../pages/login";
import Index from "../pages";
import NotFound from "../pages/notfound";
const Routers = () => {
    let base = import.meta.env.VITE_PATH;
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={`${base}/`} element={<Index />} />
                    <Route path={`${base}/home`} element={<Index />} />
                </Route>
                <Route path={`${base}/*`} element={<NotFound />} />
                <Route path={`${base}/login`} element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;