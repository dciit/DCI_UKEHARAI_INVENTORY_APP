import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Login from "../pages/login";
import Index from "../pages";
import NotFound from "../pages/notfound";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { persistor } from "../redux/store";
import emptyCache from "../Service";
const Routers = () => {
    let base = import.meta.env.VITE_PATH;
    let VER = import.meta.env.VITE_VERSION;
    const redux = useSelector((state: any) => state.reducer);
    const dispatch = useDispatch();
    useEffect(() => {
        if (typeof redux.rev == 'undefined' || redux.rev != VER) {
            localStorage.clear();
            emptyCache();
            persistor.purge();
            dispatch({ type: 'SET_VERSION', payload: VER });
            location.reload();
        }
    }, []);
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