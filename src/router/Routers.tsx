import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Login from "../pages/login";
// import Index from "../pages";
import NotFound from "../pages/notfound";
import { createContext, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { persistor } from "../redux/store";
import emptyCache from "../Service";
import { Modal, Button } from "antd";
import Warning from "../pages/warning";
import { MContext } from "../interface";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import FitbitOutlinedIcon from "@mui/icons-material/FitbitOutlined";
import Dashboard from "../pages/dashboard";
import ResultPage from "../pages/result";
import UkeharaiNew from "../pages/ag.grid";
// import Index from "../pages";
const context: MContext = {
  navMenu: [
    // { txt: 'planning', key: 'planning', type: 'main', icon: <AppsOutlinedIcon />, path: 'home' },
    // {
    //   txt: "ukeharai",
    //   key: "ukeharai",
    //   type: "child",
    //   path: "ukeharai",
    //   icon: <FitbitOutlinedIcon />,
    // },
    {
      txt: "ukeharai (New)",
      key: "ukeharai-new",
      type: "child",
      path: "ukeharai-new",
      icon: <FitbitOutlinedIcon />,
    },
    {
      txt: "warning",
      key: "warning",
      type: "child",
      path: "warning",
      icon: <NotificationImportantOutlinedIcon />,
    },
    {
      txt: "dashboard",
      key: "dashboard",
      type: "child",
      path: "dashboard",
      icon: <DashboardOutlinedIcon />,
    },
    {
      txt: "Result (Main, Final)",
      key: "result",
      type: "child",
      path: "result",
      icon: <DashboardOutlinedIcon />,
    },
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
    "ธันวาคม",
  ],
};

export const ThemeContext = createContext(null);
const Routers = () => {
  let base = import.meta.env.VITE_PATH;
  let VER = import.meta.env.VITE_VERSION;
  const redux = useSelector((state: any) => state.reducer);
  const dispatch = useDispatch();
  // Set initial client version once to avoid showing modal on first-ever load
  useEffect(() => {
    if (!redux?.rev) {
      dispatch({ type: "SET_VERSION", payload: VER });
    }
  }, []);

  const versionMismatch = useMemo(() => {
    const clientVer = redux?.rev;
    if (clientVer === undefined || clientVer === null || clientVer === 0) return false;
    return String(clientVer) !== String(VER);
  }, [redux?.rev, VER]);

  const handleHardReload = () => {
    // Simulate Ctrl+F5: clear caches then reload without touching Redux
    emptyCache();
    // Ensure client version is updated to avoid repeat modal after reload
    dispatch({ type: "SET_VERSION", payload: VER });
    setTimeout(() => window.location.reload(), 200);
  };

  const handleClearRedux = async () => {
    try {
      persistor.pause();
      await persistor.purge();
    } catch {}
    localStorage.clear();
    dispatch({ type: "RESET" });
    dispatch({ type: "SET_VERSION", payload: VER });
    emptyCache();
    setTimeout(() => window.location.reload(), 300);
  };

  return (
    <ThemeContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={`${base}`} element={<UkeharaiNew />} />
            <Route path={`${base}/*`} element={<NotFound />} />
            {/* <Route path={`${base}/ukeharai`} element={<Index />} /> */}
            <Route path={`${base}/ukeharai-new`} element={<UkeharaiNew />} />
            <Route path={`${base}/warning`} element={<Warning />} />
            <Route path={`${base}/dashboard`} element={<Dashboard />} />
            <Route path={`${base}/result`} element={<ResultPage />} />
            {/* <Route path={`${base}/aggrid`} element={<AgGrid />} /> */}
          </Route>
          <Route path={`${base}/*`} element={<NotFound />} />
          <Route path={`${base}/login`} element={<Login />} />
          <Route path={`${base}/view/warning`} element={<Warning />} />
          <Route path={`${base}/view/dashboard`} element={<Dashboard />} />
        </Routes>
        {/* Non-closable version mismatch modal */}
        <Modal
          open={versionMismatch}
          maskClosable={false}
          closable={false}
          keyboard={false}
          footer={[
            <Button key="hard-reload" type="primary" onClick={handleHardReload}>
              Force Ctrl+F5
            </Button>,
            <Button key="clear-redux" danger onClick={handleClearRedux}>
              Clear Redux ทั้งหมด
            </Button>,
          ]}
        >
          <div className="text-base">
            <div className="font-semibold mb-2">พบเวอร์ชันใหม่ของระบบ</div>
            <div>
              เวอร์ชันปัจจุบันของคุณ: <b>{String(redux?.rev ?? "-")}</b>
            </div>
            <div>
              เวอร์ชันล่าสุดจากเซิร์ฟเวอร์: <b>{String(VER)}</b>
            </div>
            <div className="mt-3">โปรดเลือกการดำเนินการด้านล่างเพื่ออัปเดต</div>
          </div>
        </Modal>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default Routers;
