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
import { MContext } from "../interface";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import FitbitOutlinedIcon from '@mui/icons-material/FitbitOutlined';
import Dashboard from "../pages/dashboard";
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
const context: MContext = {
    navMenu: [
        { txt: 'planning', key: 'planning', type: 'main', icon: <AppsOutlinedIcon />, path: 'home' },
        { txt: 'ukeharai', key: 'ukeharai', type: 'child', path: 'ukeharai', icon: <FitbitOutlinedIcon /> },
        { txt: 'warning', key: 'warning', type: 'child', path: 'warning', icon: <NotificationImportantOutlinedIcon /> },
        { txt: 'dashboard', key: 'dashboard', type: 'child', path: 'dashboard', icon: <DashboardOutlinedIcon /> }
    ],
    months: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"]
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
                        <Route path={`${base}`} element={<Index />} />
                        <Route path={`${base}/*`} element={<Index />} />
                        <Route path={`${base}/ukeharai`} element={<Index />} />
                        <Route path={`${base}/warning`} element={<Warning />} />
                        <Route path={`${base}/dashboard`} element={<Dashboard />} />
                    </Route>
                    <Route path={`${base}/*`} element={<NotFound />} />
                    <Route path={`${base}/login`} element={<Login />} />
                    <Route path={`${base}/view/warning`} element={<Warning />} />
                    {/* <Route path={`${base}/warning/pdf`} element={<FormWarningPDF />} /> */}
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}

export default Routers;