import { Button, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
function NotFound() {
    const navigate = useNavigate();
    const base = import.meta.env.VITE_PATH;
    return (
        <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
            <Typography variant='h1' className='animate-pulse text-red-500'>404</Typography>
            <Typography variant='h2' className='font-bold'>Not Found</Typography>
            <Typography variant='caption'>The resource requested could not be found on this server !</Typography>
            <Button variant='contained' color='error' startIcon={<HomeIcon />} onClick={() => navigate(`/${base}/home`)}>กลับหน้าหลัก</Button>
        </div>
    )
}

export default NotFound