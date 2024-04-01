import { Stack, Avatar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MenuComponent from './menu.component'
import { useNavigate } from 'react-router-dom';

function NavLeft() {
    const reducer = useSelector((state: any) => state.reducer);
    const VITE_PATH_IMAGE = import.meta.env.VITE_PATH_IMAGE;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const base = import.meta.env.VITE_PATH;
    const empcode = reducer?.emp?.EmpCode;
    const [openMenu, setOpenMenu] = React.useState<null | HTMLElement>(null);
    const open = Boolean(openMenu);
    async function handleOpenMenu(event: React.MouseEvent<HTMLElement>) {
        setOpenMenu(event.currentTarget)
    }
    async function handleCloseMenu() {
        setOpenMenu(null);
    }
    async function handleLogout() {
        if (confirm('คุณต้องการออกจากระบบ ใช่หรือไม่ ? ')) {
            dispatch({ type: 'LOGOUT' });
            navigate(`/${base}/login`);
        }
    }
    return (
        <>
            <Stack justifyContent={'center'}>
                <div onClick={handleOpenMenu} className='flex items-center gap-2 cursor-pointer select-none'>
                    <Avatar sx={{ width: 36, height: 36 }} src={`${VITE_PATH_IMAGE}${empcode}.jpg`}>{reducer?.emp?.FullName.substring(0, 1)}</Avatar>
                </div>
            </Stack>
            <MenuComponent open={open} openMenu={openMenu} closeMenu={handleCloseMenu} handleOpenMenu={handleOpenMenu} logout={handleLogout} />
        </>
    )
}

export default NavLeft