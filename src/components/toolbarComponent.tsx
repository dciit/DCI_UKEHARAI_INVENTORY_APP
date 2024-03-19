import { Avatar, Box, Divider, Drawer, IconButton, List, Stack, Typography } from '@mui/material'
import React from 'react'
import MenuComponent from './menu.component'
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
function ToolbarComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const base = import.meta.env.VITE_PATH;
    const VITE_PATH_IMAGE = import.meta.env.VITE_PATH_IMAGE;
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
    const DrawerList = (
        // onClick={toggleDrawer(false)}
        <Box sx={{ width: 250 }} role="presentation" >
            <List className='px-2'>
                {[
                    { text: 'PLANNING', icon: <DashboardOutlinedIcon /> }
                ].map(() => (
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        <TreeItem  nodeId="1" label={<Stack direction={'row'}  alignItems={'center'} >
                            <Typography>HOME</Typography>
                        </Stack>} >
                        </TreeItem>
                        <TreeItem nodeId="1" label="Planning" >
                            <TreeItem nodeId="2" label="Ukeharai" />
                            <TreeItem nodeId="2" label="Sale forecase" />
                        </TreeItem>
                        <TreeItem nodeId="5" label="SCM">
                            <TreeItem nodeId="10" label="Home" />
                        </TreeItem>
                    </TreeView>
                ))}
            </List>
        </Box>
    );
    return (
        <div className='h-[50px] bg-white' style={{ borderBottom: '1px solid #ddd' }}>
            <Stack direction={'row'} justifyContent={'space-between'} px={2} className='h-full' alignContent={'center'}>
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    <div>
                        <IconButton onClick={toggleDrawer(true)}><DensityMediumIcon /></IconButton>
                        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                            <Stack p={1} gap={1}>
                                <Typography className='text-[14px]'>Module</Typography>
                                <Divider />
                                {DrawerList}
                            </Stack>
                        </Drawer>
                    </div>
                    <Stack alignItems={'center'} spacing={2} direction={'row'} className='cursor-pointer select-none'>
                        <img src={logo} className='w-[150px]' />
                        <Typography className='uppercase  flex justify-center items-center text-[1.5em]' >Ukeharai inventory</Typography>
                    </Stack>
                </Stack>
                <Stack justifyContent={'center'}>
                    <div onClick={handleOpenMenu} className='flex items-center gap-2 cursor-pointer select-none'>
                        <Typography className=''>{reducer?.emp?.ShortName}</Typography>
                        <Avatar sx={{ width: 36, height: 36 }} src={`${VITE_PATH_IMAGE}${empcode}.jpg`}>{reducer?.emp?.FullName.substring(0, 1)}</Avatar>
                    </div>
                </Stack>
            </Stack>
            <MenuComponent open={open} openMenu={openMenu} closeMenu={handleCloseMenu} handleOpenMenu={handleOpenMenu} logout={handleLogout} />
        </div>
    )
}

export default ToolbarComponent