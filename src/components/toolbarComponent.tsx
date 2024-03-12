import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import MenuComponent from './menu.component'
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom';
function ToolbarComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const base = import.meta.env.VITE_PATH;
    const reducer = useSelector((state: any) => state.reducer);
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
        <div className='h-[75px] bg-white' style={{ borderBottom: '1px solid #ddd' }}>
            <Stack direction={'row'} justifyContent={'space-between'} px={3} className='h-full' alignContent={'center'}>
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    {/* <Stack className='cursor-pointer'>
                        <Box className='bg-[#f6f8fa] px-2 pb-2 pt-1 rounded-lg' style={{ border: '1px solid #ddd' }}>
                            <MenuIcon />
                        </Box>
                    </Stack> */}
                    <Stack alignItems={'center'} spacing={2} direction={'row'} className='cursor-pointer select-none'>
                        <img src={logo}  className='w-[150px]' />
                        <Typography className='uppercase  flex justify-center items-center text-[1.5em]' >Ukeharai inventory</Typography>
                    </Stack>
                </Stack>
                <Stack justifyContent={'center'}>
                    <div onClick={handleOpenMenu} className='flex items-center gap-2'>
                        <Typography className=''>{reducer?.emp?.FullName}</Typography>
                        <Avatar>{reducer?.emp?.FullName.substring(0,1)}</Avatar>
                    </div>
                </Stack>
            </Stack>
            <MenuComponent open={open} openMenu={openMenu} closeMenu={handleCloseMenu} handleOpenMenu={handleOpenMenu} logout={handleLogout} />
        </div>
    )
}

export default ToolbarComponent