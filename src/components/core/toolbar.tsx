import { Avatar, Box, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import MenuComponent from './menu'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { MContext, MInitialState, MNavMenu } from '../../interface';
import { ThemeContext } from '../../router/Routers';
import { colorText, colorTextActive } from '../../constant';
function Toolbar() {
    const context: MContext = useContext(ThemeContext);
    const redux: MInitialState = useSelector((state: any) => state.reducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const base = import.meta.env.VITE_PATH;
    const VITE_PATH_IMAGE = import.meta.env.VITE_PATH_IMAGE;
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
        let toolbarMenu = context.navMenu.length > 0 ? context.navMenu[0].key : 'home';
        navigate(`/${base}/${toolbarMenu}`);
        dispatch({ type: 'MENU_ACTIVE', payload: toolbarMenu });
    }
    return (
        <div >
            <div className='flex  items-center justify-between h-[45px] border-b border-[#ddd] gap-6 px-3'>
                <div className='flex-none flex pl-3'>
                    <IconButton onClick={toggleDrawer(true)}><DensityMediumIcon sx={{ width: '18px', height: '18px' }} /></IconButton>
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
                                                setOpenDrawer(false);
                                                navigate(`/${base}/${oNavMenu.key}`);
                                                dispatch({ type: 'MENU_ACTIVE', payload: oNavMenu.key })
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
                <div id='logo' className='flex gap-2 items-end leading-none select-none cursor-pointer' onClick={handleHome}>
                    <span className='flex-none font-semibold tracking-wider text-[#00a1e2] drop-shadow-sm'>PLANNING</span>
                </div>
                <div className='grow flex gap-6 pl-6'>
                    {
                        context.navMenu.map((oNavMenu: MNavMenu, iNavMenu: number) => {
                            let menuActive: string = typeof redux?.menuActive != 'undefined' ? redux?.menuActive : '';
                            let active: boolean = menuActive == oNavMenu.key;
                            return <span key={iNavMenu} className={`${active == true ? `${colorTextActive} font-semibold` : colorText} capitalize cursor-pointer select-none hover:text-[#09090B] transition-all duration-300 text-[14px]`} onClick={() => {
                                setOpenDrawer(false);
                                navigate(`/${base}/${oNavMenu.key}`);
                                dispatch({ type: 'MENU_ACTIVE', payload: oNavMenu.key })
                            }}>{oNavMenu.txt}</span>
                        })
                    }
                </div>
                <div className='flex-none flex items-center gap-2 cursor-pointer select-none drop-shadow-lg pr-3 justify-end' onClick={handleOpenMenu} >
                    <span className='text-[#5f5f5f] font-semibold'>{reducer?.emp?.ShortName}</span>
                    <Avatar sx={{ width: 36, height: 36 }} src={`${VITE_PATH_IMAGE}${empcode}.jpg`}>{reducer?.emp?.FullName.substring(0, 1)}</Avatar>
                </div>
            </div>
            <MenuComponent open={open} openMenu={openMenu} closeMenu={handleCloseMenu} handleOpenMenu={handleOpenMenu} logout={handleLogout} />
        </div>
    )
}

export default Toolbar