import { Avatar, Box, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import MenuComponent from './menu'
import { useDispatch, useSelector } from 'react-redux';
// import logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { MContext, MInitialState, MNavMenu } from '../../interface';
import { ThemeContext } from '../../router/Routers';
function Toolbar() {
    const context: MContext = useContext(ThemeContext);
    const redux: MInitialState = useSelector((state: any) => state.reducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const base = import.meta.env.VITE_PATH;
    const VITE_PATH_IMAGE = import.meta.env.VITE_PATH_IMAGE;
    const VITE_PATH_NAME_PROJECT = import.meta.env.VITE_PATH_NAME_PROJECT;
    const VITE_VERSION = import.meta.env.VITE_VERSION;
    const reducer = useSelector((state: any) => state.reducer);
    const empcode = reducer?.emp?.EmpCode;
    const [openMenu, setOpenMenu] = React.useState<null | HTMLElement>(null);
    const open = Boolean(openMenu);

    const [openDrawer, setOpenDrawer] = React.useState(false);
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
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
    };
    const handleHome = () => {
        navigate(`/${base}/home`);
    }
    return (
        <div >
            <div className='grid grid-cols-3  justify-between h-[45px] border-b border-[#ddd] '>
                <div className='flex pl-3'>
                    <IconButton onClick={toggleDrawer(true)}><DensityMediumIcon /></IconButton>
                    <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                        <Box width={'175px'}>
                            <Stack p={1} gap={1} className='cursor-pointer'>
                                <Typography className='text-[14px]'>Module {VITE_VERSION}</Typography>
                                <Divider />
                                {
                                    context.navMenu.map((oNavMenu: MNavMenu, iNavMenu: number) => {
                                        let active: string = typeof redux?.menuActive != 'undefined' ? redux?.menuActive : '';
                                        return <div className={`cursor-pointer select-none capitalize ${active == oNavMenu.txt && 'bg-[#5c5fc8] text-white rounded-md'}  ${oNavMenu.type != 'main' && 'hover:bg-[#5c5fc8] hover:text-white hover:rounded-md'} px-2 pt-1 pb-2 transition-all duration-200 ${oNavMenu.type == 'child' && 'pl-6'}`} key={iNavMenu}>
                                            <Stack direction={'row'} spacing={1} onClick={() => {
                                                if (oNavMenu.type != 'main') {
                                                    setOpenDrawer(false);
                                                    navigate(`/${base}/${oNavMenu.path}`);
                                                    dispatch({ type: 'MENU_ACTIVE', payload: oNavMenu.key })
                                                }
                                            }}>
                                                {oNavMenu.icon}
                                                <span>{oNavMenu.key}</span>
                                            </Stack>
                                        </div>
                                    })
                                }
                            </Stack>
                        </Box>
                    </Drawer>
                </div>
                <div className={`select-none uppercase  flex justify-center items-center text-[14px] sm:text-[16px] md:text-[18px] xl:text-[20px] text-[#5c5fc8]  font-['Roboto'] font-bold`} onClick={handleHome}>{VITE_PATH_NAME_PROJECT}</div>
                <div className='flex items-center gap-2 cursor-pointer select-none drop-shadow-lg pr-3 justify-end' onClick={handleOpenMenu} >
                    <span className='text-[#5f5f5f] font-semibold'>{reducer?.emp?.ShortName}</span>
                    <Avatar sx={{ width: 36, height: 36 }} src={`${VITE_PATH_IMAGE}${empcode}.jpg`}>{reducer?.emp?.FullName.substring(0, 1)}</Avatar>
                </div>
            </div>
            <MenuComponent open={open} openMenu={openMenu} closeMenu={handleCloseMenu} handleOpenMenu={handleOpenMenu} logout={handleLogout} />
        </div>
    )
}

export default Toolbar