import { Link } from '@material-ui/core'
import { Breadcrumbs, Typography } from '@mui/material'
import { useContext } from 'react';
import { ThemeContext } from '../router/Routers';
import { useSelector } from 'react-redux';
import { MContext } from '../interface';

function Breadcrumb() {
    const VITE_PATH = import.meta.env.VITE_PATH;
    const context: MContext = useContext(ThemeContext);
    const redux = useSelector((state: any) => state.reducer);
    const menu_active = redux.menuActive
    let menu_txt: string = menu_active;
    if (Object.keys(context.navMenu.filter(o => o.key == menu_active)).length) {
        menu_txt = context.navMenu.filter(o => o.key == menu_active)[0].txt;
    }
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href={`${VITE_PATH}/home`}>
                Planning system
            </Link>
            <Typography color="text.primary" className='capitalize'>{menu_txt}</Typography>
        </Breadcrumbs>
    )
}

export default Breadcrumb