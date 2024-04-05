import { Alert, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';
import { persistor } from '../redux/store'
import CloseIcon from '@mui/icons-material/Close';
function Login() {
    const base = import.meta.env.VITE_PATH;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    let msgUser = 'กรุณากรอกชื่อผู้ใช้ให้ถูกต้อง';
    let msgPwd = 'กรุณากรอกรหัสผ่านให้ถูกต้อง';
    const [userReq, setUserReq] = useState<boolean>(false);
    const [pwdReq, setPwdReq] = useState<boolean>(false);
    const [msgError] = useState<string>('ไม่สามารถเข้าสู่ระบบได้ เนื่องจาก ชื่อผู้ใช้หรือรหัสผ่าน ไม่ถูกต้อง');
    const [load, setLoad] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    async function handleLogin() {
        let state: boolean = true;
        if (!user.length) {
            state = false;
            setUserReq(true);
        }
        if (!pwd.length) {
            state = false;
            setPwdReq(true);
        }
        setError(false);
        if (state) {
            setLoad(true);
            setUserReq(false);
            setPwdReq(false);
            axios.get('http://websrv01.dci.daikin.co.jp/BudgetCharts/BudgetRestService/api/authen?username=' + user + '&password=' + encodeURIComponent(pwd)).then((res) => {
                if (res.data[0]?.FullName != null) {
                    persistor.purge();
                    dispatch({ type: 'LOGIN', payload: { login: true, data: res.data[0] } });
                    navigate(`/${base}/ukeharai`);
                    setLoad(false)
                } else {
                    setError(true);
                    setLoad(false)
                }
            }).catch((error) => {
                alert('ไม่สามารถเข้าสู่ระบบได้ เนื่องจาก ' + error.message)
                setLoad(false);
                setError(true);
            });
        }
    }

    return (
        <div className={`flex ${load ? 'justify-center' : 'justify-start'} items-center h-[100%] flex-col gap-6 pt-[5%] select-none`}>
            {
                load ? <div className=' w-[25%] h-auto px-8 pt-4 pb-8 flex flex-col  justify-center items-center gap-3'>
                    <Stack justifyItems={'center'} alignItems={'center'} gap={1}>
                        <CircularProgress />
                        <Typography>กำลังโหลดข้อมูล</Typography>
                    </Stack>
                    <Button variant='contained' color='error' startIcon={<CloseIcon />} onClick={() => setLoad(false)}>ยกเลิก</Button>
                </div> :
                    <>
                        <AppRegistrationIcon sx={{
                            fontSize: '7.5em'
                        }} />
                        <Typography variant='h5' className='font-thin w-full text-center'>Sign in to Ukeharai System</Typography>
                        <div className='bg-[#f6f8fa] w-[25%] rounded-[6px] h-auto px-8 pt-4 pb-8 flex flex-col gap-4' style={{ border: '1px solid #d8dee4' }}>
                            <Stack gap={1}>
                                <Typography variant='caption' className='text-[#1f2328]' >Empcode Or AD Username</Typography>
                                <TextField className='p-0 bg-white rounded-lg' size='small' value={user} onChange={(e) => {
                                    setUser(e.target.value);
                                    setError(false);
                                    if (e.target.value.length) {
                                        setUserReq(false);
                                    }
                                }}></TextField>
                                {
                                    userReq && <Typography variant='caption' className='text-red-500'>{msgUser}</Typography>
                                }
                            </Stack>
                            <Stack gap={1}>
                                <Typography variant='caption' className='text-[#1f2328]' >Empcode Or Password</Typography>
                                <TextField type='password' className='p-0 bg-white' size='small' value={pwd} onChange={(e) => {
                                    setPwd(e.target.value);
                                    setError(false);
                                    if (e.target.value.length) {
                                        setPwdReq(false);
                                    }
                                }}></TextField>
                                {
                                    pwdReq && <Typography variant='caption' className='text-red-500'>{msgPwd}</Typography>
                                }
                            </Stack>
                            <Button onClick={handleLogin} className='bg-[#1f883d] text-white font-bold'>  Sign in</Button>
                            {
                                error && <Alert severity="error">{msgError}</Alert>
                            }
                        </div>
                        <Typography variant='caption' className='text-[#1f2328]'>Implement date : 22/02/2024 Version : 1.0</Typography>
                    </>
            }
        </div>
    )
}

export default Login