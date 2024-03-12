import { Outlet } from "react-router";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import ToolbarComponent from "./components/toolbarComponent";
import Login from "./pages/login";
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
                <div className="h-[90%]  bg-[#f9f9f9]">
                    <Outlet />
                </div>
            </Stack>
        }
    </Stack>
}

export default Layout