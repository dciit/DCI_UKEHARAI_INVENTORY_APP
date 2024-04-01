import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Login from "../pages/login";
import Index from "../pages";
import NotFound from "../pages/notfound";
import { createContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { persistor } from "../redux/store";
import emptyCache from "../Service";
import Warning from "../pages/warning";
import Home from "../pages/home";
import { MContext } from "../interface";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import FitbitOutlinedIcon from '@mui/icons-material/FitbitOutlined';
import Dashboard from "../pages/dashboard";
const context: MContext = {
    navMenu: [{ txt: 'home', key: 'home', type: 'main', icon: <HomeOutlinedIcon />, path: 'home' },
    { txt: 'dashboard', key: 'dashboard', type: 'child', path: 'dashboard', icon: <DashboardOutlinedIcon /> },
    { txt: 'ukeharai', key: 'ukeharai', type: 'child', path: 'ukeharai', icon: <FitbitOutlinedIcon /> },
    { txt: 'warning', key: 'warning', type: 'child', path: 'warning', icon: <NotificationImportantOutlinedIcon /> },]
}
export const ThemeContext = createContext(null);
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
            dispatch({ type: 'RESET' });
            dispatch({ type: 'SET_VERSION', payload: VER });
            location.reload();
        }
    }, []);
    return (
        <ThemeContext.Provider value={context} >
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                    <Route path={`${base}/*`} element={<Home />} />
                        <Route path={`${base}/home`} element={<Home />} />
                        <Route path={`${base}/ukeharai`} element={<Index />} />
                        <Route path={`${base}/warning`} element={<Warning />} />
                        <Route path={`${base}/dashboard`} element={<Dashboard />} />
                    </Route>
                    <Route path={`${base}/*`} element={<NotFound />} />
                    <Route path={`${base}/login`} element={<Login />} />
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}

export default Routers;