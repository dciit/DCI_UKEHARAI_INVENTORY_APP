import { Outlet } from "react-router";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import ToolbarComponent from "./components/toolbarComponent";
import Login from "./pages/login";
import Breadcrumb from "./components/breadcrumb.component";
function Layout() {
    const reducer = useSelector((state: any) => state.reducer);
    let oLogin = false;
    if (typeof reducer.login !== 'undefined') {
        oLogin = reducer.login;
    }
    return <Stack className='h-[100%] w-[100%] bg-[#e7ebee++]'>
        {
            !oLogin ? <Login /> : <Stack className='h-[100%] w-[100%] bg-[#e7ebee++]'>
                <ToolbarComponent />
                <div className="h-[100%]  bg-[#f9f9f9] px-[18px] py-[18px] flex flex-col gap-2">
                    <Breadcrumb />
                    <div className="bg-white h-full w-full card-mtr overflow-x-scroll max-h-[90%]">
                        <Outlet />
                    </div>
                </div>
            </Stack>
        }
    </Stack>
}

export default Layout