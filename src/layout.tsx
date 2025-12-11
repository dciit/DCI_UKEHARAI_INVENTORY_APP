import { Outlet } from "react-router";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/login";
import { useEffect } from "react";
import Toolbar from "./components/core/toolbar";
function Layout() {
  const reducer = useSelector((state: any) => state.reducer);
  const reduxEmp = reducer.emp;
  const dispatch = useDispatch();
  let oLogin = false;
  useEffect(() => {
    if (reduxEmp == "") {
      dispatch({ type: "LOGOUT" });
    }
  }, []);
  if (typeof reducer.login !== "undefined") {
    oLogin = reducer.login;
  }
  return (
    <Stack className="h-[100%] w-[100%] ">
      {!oLogin ? (
        <Login />
      ) : (
        <div className="h-[100%] w-[100%] ">
          <Toolbar />
          <div className="h-[95%]  px-[18px] py-[18px] flex flex-col gap-2">
            <div className="h-full w-full card-mtr overflow-x-scroll max-h-[100%]" id="outlet">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </Stack>
  );
}

export default Layout;
