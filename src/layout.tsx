import { Outlet } from "react-router";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ToolbarComponent from "./components/toolbarComponent";
import Login from "./pages/login";
import Breadcrumb from "./components/breadcrumb.component";
import { useEffect } from "react";
function Layout() {
    const reducer = useSelector((state: any) => state.reducer);
    const reduxEmp = reducer.emp;
    const dispatch = useDispatch();
    let oLogin = false;
    useEffect(() => {
        if (reduxEmp == "") {
            dispatch({ type: 'LOGOUT' });
        }
    }, [])
    if (typeof reducer.login !== 'undefined') {
        oLogin = reducer.login;
    }
    return <Stack className='h-[100%] w-[100%] bg-[#e7ebee++]'>
        {
            !oLogin ? <Login /> : <Stack className='h-[100%] w-[100%] bg-[#e7ebee++]'>
                <ToolbarComponent />
                <div className="h-[100%]  bg-[#f9f9f9] px-[18px] py-[18px] flex flex-col gap-2">
                    <Breadcrumb />
                    <div className="bg-white h-full w-full card-mtr overflow-x-scroll max-h-[100%]" id = 'outlet'>
                        <Outlet />
                    </div>
                </div>
            </Stack>
        }
    </Stack>
}

export default Layout