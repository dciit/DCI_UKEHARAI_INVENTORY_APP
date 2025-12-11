import { Alert, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import axios from "axios";
import { persistor } from "../redux/store";
import CloseIcon from "@mui/icons-material/Close";

interface ValidationState {
  user: boolean;
  pwd: boolean;
}

interface FormData {
  user: string;
  pwd: string;
}

const MESSAGES = {
  USER_REQUIRED: "กรุณากรอกชื่อผู้ใช้ให้ถูกต้อง",
  PWD_REQUIRED: "กรุณากรอกรหัสผ่านให้ถูกต้อง",
  LOGIN_ERROR: "ไม่สามารถเข้าสู่ระบบได้ เนื่องจาก ชื่อผู้ใช้หรือรหัสผ่าน ไม่ถูกต้อง",
  LOADING: "กำลังโหลดข้อมูล",
  NETWORK_ERROR: "ไม่สามารถเข้าสู่ระบบได้ เนื่องจาก ",
  VALIDATION_ERROR: "กรุณากรอกข้อมูลให้ครบถ้วน",
};

function Login() {
  const base = import.meta.env.VITE_PATH;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    user: "",
    pwd: "",
  });

  const [validation, setValidation] = useState<ValidationState>({
    user: false,
    pwd: false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleInputChange = useCallback(
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      setError("");

      if (value.length > 0) {
        setValidation((prev) => ({ ...prev, [field]: false }));
      }
    },
    []
  );

  const validateForm = useCallback((): boolean => {
    const newValidation: ValidationState = {
      user: !formData.user.trim(),
      pwd: !formData.pwd.trim(),
    };

    setValidation(newValidation);
    return !Object.values(newValidation).some(Boolean);
  }, [formData]);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) {
      setError(MESSAGES.VALIDATION_ERROR);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://websrv01.dci.daikin.co.jp/BudgetCharts/BudgetRestService/api/authen`, {
        params: {
          username: formData.user,
          password: formData.pwd,
        },
      });

      if (response.data?.[0]?.FullName) {
        await persistor.purge();
        dispatch({
          type: "LOGIN",
          payload: {
            login: true,
            data: response.data[0],
          },
        });
        navigate(`/${base}/`);
      } else {
        setError(MESSAGES.LOGIN_ERROR);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Unknown error";
      setError(`${MESSAGES.NETWORK_ERROR}${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [formData, validateForm, dispatch, navigate, base]);

  const handleCancel = useCallback(() => {
    setLoading(false);
    setError("");
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    },
    [handleLogin]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full flex-col gap-6 select-none">
        <div className="w-[35%] h-auto px-8 pt-4 pb-8 flex flex-col justify-center items-center gap-3">
          <Stack justifyItems="center" alignItems="center" gap={1}>
            <CircularProgress />
            <Typography>{MESSAGES.LOADING}</Typography>
          </Stack>
          <Button variant="contained" color="error" startIcon={<CloseIcon />} onClick={handleCancel}>
            ยกเลิก
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full flex-col gap-6 select-none">
      <AppRegistrationIcon sx={{ fontSize: "7.5em" }} />
      <Typography variant="h5" className="font-thin w-full text-center">
        Sign in to Ukeharai System
      </Typography>

      <div
        className="bg-[#f6f8fa] w-[35%] rounded-[6px] h-auto px-8 pt-4 pb-8 flex flex-col gap-4"
        style={{ border: "1px solid #d8dee4" }}
        onKeyPress={handleKeyPress}
      >
        <Stack gap={1}>
          <Typography variant="caption" className="text-[#1f2328]">
            Empcode Or AD Username
          </Typography>
          <TextField
            className="p-0 bg-white rounded-lg"
            size="small"
            value={formData.user}
            onChange={handleInputChange("user")}
            error={validation.user}
            autoComplete="username"
          />
          {validation.user && (
            <Typography variant="caption" className="text-red-500">
              {MESSAGES.USER_REQUIRED}
            </Typography>
          )}
        </Stack>

        <Stack gap={1}>
          <Typography variant="caption" className="text-[#1f2328]">
            Password
          </Typography>
          <TextField
            type="password"
            className="p-0 bg-white"
            size="small"
            value={formData.pwd}
            onChange={handleInputChange("pwd")}
            error={validation.pwd}
            autoComplete="current-password"
          />
          {validation.pwd && (
            <Typography variant="caption" className="text-red-500">
              {MESSAGES.PWD_REQUIRED}
            </Typography>
          )}
        </Stack>

        <Button onClick={handleLogin} className="bg-[#1f883d] text-white font-bold" disabled={loading}>
          Sign in
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
      </div>

      <Typography variant="caption" className="text-[#1f2328]">
        Implement date : 22/02/2024 Version : 1.0
      </Typography>
    </div>
  );
}

export default Login;
